import React, { useState, useEffect } from 'react';
import { 
    FaVolumeUp, 
    FaVolumeMute, 
    FaReact, 
    FaNodeJs, 
    FaPython, 
    FaFigma 
} from 'react-icons/fa';
import { SiTensorflow, SiVuedotjs } from 'react-icons/si';

const ErenPortfolio: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);

    const createSnowflakes = () => {
        const snowflakeCount = 50;
        const newSnowflakes = Array.from({ length: snowflakeCount }, (_, i) => (
            <div 
                key={i} 
                className="snowflake"
                style={{
                    left: `${Math.random() * 100}vw`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    opacity: Math.random(),
                    fontSize: `${Math.random() * 10 + 10}px`
                }}
            >
                ❄
            </div>
        ));
        setSnowflakes(newSnowflakes);
    };

    const toggleMusic = () => {
        const audio = document.getElementById('bgMusic') as HTMLAudioElement;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        createSnowflakes();
        const audio = document.getElementById('bgMusic') as HTMLAudioElement;
        if (audio) {
            audio.volume = 0.3;
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                console.log('Müzik otomatik başlatılamadı. Lütfen butona tıklayın.');
            });
        }
    }, []);

    return (
        <div className="bg-black text-white overflow-x-hidden font-poppins">
            {/* Kar Efekti Container */}
            <div id="snow-container" className="fixed inset-0 pointer-events-none z-10">
                {snowflakes}
            </div>

            {/* Müzik Player */}
            <div 
                className="music-player fixed bottom-5 right-5 bg-white/10 p-4 rounded-full cursor-pointer z-50 backdrop-blur-lg border border-white/20 transition-all hover:scale-110" 
                onClick={toggleMusic}
            >
                {isPlaying ? <FaVolumeUp className="text-white text-2xl" /> : <FaVolumeMute className="text-white text-2xl" />}
            </div>

            {/* Müzik */}
            <audio id="bgMusic" loop>
                <source src="https://files.catbox.moe/ukui4v.mp3" type="audio/mpeg" />
            </audio>

            {/* Header */}
            <header className="fixed top-0 w-full bg-opacity-90 backdrop-blur-lg z-50">
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-3xl font-bold">EREN ADIGÜZEL</div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#home" className="nav-link">Ana Sayfa</a>
                            <a href="#skills" className="nav-link">Yetenekler</a>
                            <a href="#projects" className="nav-link">Projeler</a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 pt-24">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">
                                Merhaba, Ben Eren! 👋
                            </h1>
                            <p className="text-2xl mb-6 opacity-90">
                                Full Stack Developer & UI/UX Designer
                            </p>
                            <div className="flex space-x-4">
                                <a href="#projects" className="glass-btn">
                                    Projelerimi Gör
                                </a>
                                <a href="#" className="glass-btn">
                                    CV İndir
                                </a>
                            </div>
                        </div>
                        <div className="profile-container">
                            <img 
                                src="https://r.resimlink.com/Ww7tlvA1QBa.jpg" 
                                alt="Eren Adıgüzel" 
                                className="profile-image" 
                            />
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-24">
                    <h2 className="text-4xl font-bold text-center mb-12">Yeteneklerim</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Frontend Skills */}
                        <div className="project-card">
                            <h3 className="text-2xl font-bold mb-6">Frontend</h3>
                            <div className="space-y-6">
                                <SkillBar 
                                    name="React" 
                                    percentage={90} 
                                    icon={<FaReact className="text-blue-500" />} 
                                />
                                <SkillBar 
                                    name="Vue.js" 
                                    percentage={85} 
                                    icon={<SiVuedotjs className="text-green-500" />} 
                                />
                            </div>
                        </div>

                        {/* Backend Skills */}
                        <div className="project-card">
                            <h3 className="text-2xl font-bold mb-6">Backend</h3>
                            <div className="space-y-6">
                                <SkillBar 
                                    name="Node.js" 
                                    percentage={88} 
                                    icon={<FaNodeJs className="text-green-600" />} 
                                />
                                <SkillBar 
                                    name="Python" 
                                    percentage={82} 
                                    icon={<FaPython className="text-yellow-500" />} 
                                />
                            </div>
                        </div>

                        {/* Design Skills */}
                        <div className="project-card">
                            <h3 className="text-2xl font-bold mb-6">Design</h3>
                            <div className="space-y-6">
                                <SkillBar 
                                    name="UI/UX" 
                                    percentage={92} 
                                    icon={<FaFigma className="text-purple-500" />} 
                                />
                                <SkillBar 
                                    name="Figma" 
                                    percentage={85} 
                                    icon={<FaFigma className="text-pink-500" />} 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-24">
                    <h2 className="text-4xl font-bold text-center mb-12">Projelerim</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <ProjectCard 
                            title="E-Ticaret Platformu" 
                            description="Modern ve ölçeklenebilir e-ticaret çözümü" 
                            technologies={[
                                { name: 'React', icon: <FaReact className="text-blue-400" /> },
                                { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> }
                            ]} 
                        />
                        <ProjectCard 
                            title="AI Chat Uygulaması" 
                            description="Yapay zeka destekli sohbet platformu" 
                            technologies={[
                                { name: 'Python', icon: <FaPython className="text-yellow-500" /> },
                                { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> }
                            ]} 
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

// Skill Bar Component
interface SkillBarProps {
    name: string;
    percentage: number;
    icon: React.ReactNode;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, icon }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
                {icon}
                <span>{name}</span>
            </div>
            <span>{percentage}%</span>
        </div>
        <div className="h-2 bg-white bg-opacity-10 rounded">
            <div 
                className="h-full bg-white rounded" 
                style={{ width: `${percentage}%` }} 
            />
        </div>
    </div>
);

// Project Card Component
interface ProjectCardProps {
    title: string;
    description: string;
    technologies: Array<{ name: string; icon: React.ReactNode }>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies }) => (
    <div className="project-card">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="opacity-90 mb-4">{description}</p>
        <div className="flex gap-2 items-center">
            {technologies.map((tech, index) => (
                <div 
                    key={index} 
                    className="glass-btn text-sm flex items-center space-x-2"
                >
                    {tech.icon}
                    <span>{tech.name}</span>
                </div>
            ))}
        </div>
    </div>
);

export default ErenPortfolio;
