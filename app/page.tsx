'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const bonusSites = [
  {
    name: "VİPSLOT",
    bonus: "999 Adet Freespin",
    description: "Üyelik sonrası anında",
    image: "https://r.resimlink.com/R-wcfhWlGI.jpg",
    link: "https://m.vipslot300.com/tr/"
  },
  {
    
  {
    name: "ROYALBET",
    bonus: "25₺ Free Bonus",
    description: "Telefon onayı ile",
    image: "https://r.resimlink.com/hufW_RxA-8XD.jpg", 
    link: "https://m.royalbet606.com/?btag=1758679"
  },
  {
    name: "BETBOX",
    bonus: "40₺ Deneme Bonusu",
    description: "Anında hesabında",
    image: "https://r.resimlink.com/JsX6Ar0Vg.png",
    link: "https://m.betbox2314.com/?btag=788067"
  },
  {
    name: "Grandpasha",
    bonus: "60₺ Hoşgeldin Bonusu",
    description: "İlk üyeliğe özel",
    image: "https://r.resimlink.com/_s87y.png",
    link: "https://grandpashabet2208.com/?btag=85489772_379736"
  },
  {
    name: "Dinamobet",
    bonus: "35₺ Deneme Bonusu",
    description: "Hızlı onay",
    image: "https://r.resimlink.com/WVztCFKS1n.png",
    link: "https://m.dinamobet846.com/?ref=mobileamp#/main"
  },
  {
    name: "Betwoon",
    bonus: "45₺ Free Bonus",
    description: "7/24 destek",
    image: "https://r.resimlink.com/YrM_HZ-uiG.jpg",
    link: "https://betwoon716.com/?btag=61575515_344299"
  },
  {
    name: "Favorisen",
    bonus: "55₺ Deneme Bonusu",
    description: "Anında onay",
    image: "https://r.resimlink.com/Mq7eQGH.png",
    link: "https://m.656favorisen.com/tr/"
  },
  {
    name: "Turboslot",
    bonus: "40₺ Free Bonus",
    description: "Özel bonus",
    image: "https://r.resimlink.com/-ZjEB.jpg",
    link: "https://www.turboslot464.com/tr/casino/?btag=35941268_222575"
  },
  {
    name: "Betgaranti",
    bonus: "50₺ Deneme Bonusu",
    description: "Whatsapp destek",
    image: "https://r.resimlink.com/FwIkQ.jpg",
    link: "https://www.betgaranti918.com/register?ref=143&cid=&clickid=&visitor_id="
  }
]

export default function Home() {
  useEffect(() => {
    const loadSnowEffect = async () => {
      try {
        const { default: Snowflakes } = await import('magic-snowflakes')
        new Snowflakes({
          count: 50,
          speed: 0.5,
          rotation: true,
          color: '#ffffff10',
          size: 3,
          zIndex: 1
        })
      } catch (error) {
        console.error('Snow effect loading failed:', error)
      }
    }
    loadSnowEffect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-black/30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center py-8 md:py-12 backdrop-blur-sm"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
          Deneme Bonusu Veren Siteler
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-6">En Güncel ve Güvenilir Bonus Fırsatları</p>
        
        <a
          href="https://t.me/BonusXY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-violet-500/10 hover:bg-violet-500/20 text-white px-5 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-md border border-violet-500/20"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.164.433-.001.061.018.181.002.294z"/>
          </svg>
          Telegram Destek
        </a>
      </motion.div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {bonusSites.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:scale-102 transition-all duration-300 border border-white/10"
            >
              <div className="relative h-40 bg-black/40">
                <img
                  src={site.image}
                  alt={`${site.name} Logo`}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-violet-300 mb-2">{site.name}</h3>
                <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 mb-3">
                  <p className="text-lg font-bold text-white">{site.bonus}</p>
                  <p className="text-gray-300 text-sm mt-1">{site.description}</p>
                </div>
                
                <a
                  href={site.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-all duration-300"
                >
                  BONUS AL
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="bg-black/40 backdrop-blur-md py-4 relative z-10 mt-8 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2024 Bonus Portal. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
