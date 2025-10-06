"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    'nav.features': 'Features',
    'nav.photoGenerator': 'PhotoGenerator',
    'nav.language': 'Language',
    'nav.startFree': 'Start Free',

    // Hero Section
    'hero.title': 'AI Work Editprotips',
    'hero.description': 'AI Work Editprotips is your intelligent editing assistant that provides advanced tools, simplified workflows, and innovative solutions to enhance your productivity. Experience the future of AI photo editing with AI Work Editprotips advanced model that delivers consistent character editing and superior scene preservation. Whether you need AI Work Editprotips free access or professional AI Work Editprotips capabilities, our platform offers the best solutions.',
    'hero.startEditing': 'Start Editing →',
    'hero.viewExamples': 'View Examples',
    'hero.feature1': 'One-shot editing',
    'hero.feature2': 'Multi-mode support',
    'hero.feature3': 'Natural interaction',

    // AI Editor Section
    'editor.title': 'Try The AI Editor',
    'editor.description': 'Experience the power of AI Work Editprotips natural language photo editing. Transform any photo with simple text commands using AI Work Editprotips advanced technology. Upload your images and use natural language to create stunning visuals. Get started with AI Work Editprotips free tier or upgrade to access advanced Experience features and Photoshop integrations.',
    'editor.promptEngine': 'Prompt Engine',
    'editor.promptEngineDesc': 'Transform your vision into AI-powered editing.',
    'editor.photoEdit': 'Photo Edit',
    'editor.textToPhoto': 'Text to Photo',
    'editor.uploadText': 'Drop an photo here or click to upload',
    'editor.fileSize': 'Max file size: 10MB JPG, PNG, WebP',
    'editor.mainPrompt': 'Main Prompt',
    'editor.promptPlaceholder': 'A futuristic cityscape at sunset with neon lighting, cyberpunk style architecture...',
    'editor.generateNow': 'Generate Now',
    'editor.generating': 'Generating...',
    'editor.outputGallery': 'Output Gallery',
    'editor.outputGalleryDesc': 'View AI-generated photos and download instantly.',
    'editor.generatingImage': 'Generating your image...',
    'editor.downloadImage': 'Download Image',
    'editor.readyForGeneration': 'Ready for instant generation',
    'editor.uploadPrompts': 'Just click photos and upload your prompts.',
    'editor.alertUploadImage': 'Please upload an image',
    'editor.alertEnterPrompt': 'Please enter a prompt',

    // Examples Section
    'examples.title': 'AI Work Editprotips Prompt',
    'examples.description': 'See how our platform transforms your photos with simple text prompts. Experience the power of our advanced technology.',
    'examples.originalPhoto': 'Original photo',
    'examples.aiPrompt': 'AI Prompt',
    'examples.textPrompt': 'Text Prompt',
    'examples.aiGenerated': 'AI Generated',
    'examples.aiPhoto': 'AI Photo',
    'examples.prompt1': '"Turn this photo into a beach vacation scene with the sea, the beach, and a boy surfing in the sea"',
    'examples.prompt2': '"Generate an AI 8-year-old boy riding a scooter in the park"',
    'examples.prompt3': '"Fix scratches and damage, and colorize old photos"',
    'examples.fromTextToReality': 'From Text to Reality',
    'examples.tryThisStyle': 'Try This Style →',
    'examples.generatePhoto': 'Generate photo →',
    'examples.fixColorize': 'Fix & Colorize →',
    'examples.portrait': 'Portrait',
    'examples.landscape': 'Landscape',
    'examples.restore': 'Restore',

    // Why Choose Section
    'whyChoose.title': 'Why Choose AI Work Editprotips?',
    'whyChoose.description': 'AI Work Editprotips is the most advanced AI photo editor on the market, offering unparalleled ease of use and professional-grade results. With a more Editprotips, you get access to cutting-edge AI Work Editprotips technology that delivers consistent character editing and AI Work Editprotips high-quality results. Start AI Work Editprotips free plan or explore premium features with our advanced subscription and AI Work Editprotips premium plans.',
  },
  hi: {
    // Header
    'nav.features': 'विशेषताएँ',
    'nav.photoGenerator': 'फोटो जेनरेटर',
    'nav.language': 'भाषा',
    'nav.startFree': 'मुफ़्त शुरुआत करें',

    // Hero Section
    'hero.title': 'AI वर्क एडिटप्रोटिप्स',
    'hero.description': 'AI वर्क एडिटप्रोटिप्स आपका बुद्धिमान संपादन सहायक है जो उन्नत उपकरण, सरल वर्कफ़्लो और आपकी उत्पादकता बढ़ाने के लिए अभिनव समाधान प्रदान करता है। AI वर्क एडिटप्रोटिप्स उन्नत मॉडल के साथ AI फोटो संपादन के भविष्य का अनुभव करें जो सुसंगत चरित्र संपादन और बेहतर दृश्य संरक्षण प्रदान करता है। चाहे आपको AI वर्क एडिटप्रोटिप्स मुफ़्त पहुंच की आवश्यकता हो या पेशेवर AI वर्क एडिटप्रोटिप्स क्षमताओं की, हमारा प्लेटफ़ॉर्म सर्वोत्तम समाधान प्रदान करता है।',
    'hero.startEditing': 'संपादन शुरू करें →',
    'hero.viewExamples': 'उदाहरण देखें',
    'hero.feature1': 'एक-शॉट संपादन',
    'hero.feature2': 'बहु-मोड समर्थन',
    'hero.feature3': 'प्राकृतिक इंटरैक्शन',

    // AI Editor Section
    'editor.title': 'AI एडिटर आज़माएं',
    'editor.description': 'AI वर्क एडिटप्रोटिप्स प्राकृतिक भाषा फोटो संपादन की शक्ति का अनुभव करें। AI वर्क एडिटप्रोटिप्स उन्नत तकनीक का उपयोग करके सरल पाठ आदेशों के साथ किसी भी फोटो को रूपांतरित करें। अपनी छवियां अपलोड करें और आश्चर्यजनक दृश्य बनाने के लिए प्राकृतिक भाषा का उपयोग करें। AI वर्क एडिटप्रोटिप्स मुफ़्त टियर के साथ शुरुआत करें या उन्नत अनुभव सुविधाओं और फोटोशॉप इंटीग्रेशन तक पहुंचने के लिए अपग्रेड करें।',
    'editor.promptEngine': 'प्रॉम्प्ट इंजन',
    'editor.promptEngineDesc': 'अपनी दृष्टि को AI-संचालित संपादन में बदलें।',
    'editor.photoEdit': 'फोटो संपादन',
    'editor.textToPhoto': 'पाठ से फोटो',
    'editor.uploadText': 'यहां एक फोटो छोड़ें या अपलोड करने के लिए क्लिक करें',
    'editor.fileSize': 'अधिकतम फ़ाइल आकार: 10MB JPG, PNG, WebP',
    'editor.mainPrompt': 'मुख्य प्रॉम्प्ट',
    'editor.promptPlaceholder': 'नियॉन लाइटिंग, साइबरपंक शैली की वास्तुकला के साथ सूर्यास्त के समय एक भविष्यवादी शहर का दृश्य...',
    'editor.generateNow': 'अभी उत्पन्न करें',
    'editor.generating': 'उत्पन्न कर रहे हैं...',
    'editor.outputGallery': 'आउटपुट गैलरी',
    'editor.outputGalleryDesc': 'AI-जनरेटेड फ़ोटो देखें और तुरंत डाउनलोड करें।',
    'editor.generatingImage': 'आपकी छवि उत्पन्न कर रहे हैं...',
    'editor.downloadImage': 'छवि डाउनलोड करें',
    'editor.readyForGeneration': 'त्वरित उत्पादन के लिए तैयार',
    'editor.uploadPrompts': 'बस फ़ोटो पर क्लिक करें और अपने प्रॉम्प्ट अपलोड करें।',
    'editor.alertUploadImage': 'कृपया एक छवि अपलोड करें',
    'editor.alertEnterPrompt': 'कृपया एक प्रॉम्प्ट दर्ज करें',

    // Examples Section
    'examples.title': 'AI वर्क एडिटप्रोटिप्स प्रॉम्प्ट',
    'examples.description': 'देखें कि हमारा प्लेटफ़ॉर्म सरल पाठ प्रॉम्प्ट के साथ आपकी तस्वीरों को कैसे बदलता है। हमारी उन्नत तकनीक की शक्ति का अनुभव करें।',
    'examples.originalPhoto': 'मूल फोटो',
    'examples.aiPrompt': 'AI प्रॉम्प्ट',
    'examples.textPrompt': 'पाठ प्रॉम्प्ट',
    'examples.aiGenerated': 'AI जनरेटेड',
    'examples.aiPhoto': 'AI फोटो',
    'examples.prompt1': '"इस तस्वीर को समुद्र तट की छुट्टी के दृश्य में बदलें, समुद्र, समुद्र तट और समुद्र में सर्फिंग करते लड़के के साथ"',
    'examples.prompt2': '"पार्क में स्कूटर की सवारी करते हुए एक AI 8 वर्षीय लड़के को उत्पन्न करें"',
    'examples.prompt3': '"खरोंच और क्षति को ठीक करें, और पुरानी तस्वीरों को रंगीन करें"',
    'examples.fromTextToReality': 'पाठ से वास्तविकता तक',
    'examples.tryThisStyle': 'इस शैली को आज़माएं →',
    'examples.generatePhoto': 'फोटो उत्पन्न करें →',
    'examples.fixColorize': 'ठीक करें और रंगीन करें →',
    'examples.portrait': 'पोर्ट्रेट',
    'examples.landscape': 'लैंडस्केप',
    'examples.restore': 'पुनर्स्थापित करें',

    // Why Choose Section
    'whyChoose.title': 'AI वर्क एडिटप्रोटिप्स क्यों चुनें?',
    'whyChoose.description': 'AI वर्क एडिटप्रोटिप्स बाजार में सबसे उन्नत AI फोटो एडिटर है, जो अद्वितीय उपयोग में आसानी और पेशेवर-ग्रेड परिणाम प्रदान करता है। अधिक एडिटप्रोटिप्स के साथ, आपको अत्याधुनिक AI वर्क एडिटप्रोटिप्स तकनीक तक पहुंच मिलती है जो सुसंगत चरित्र संपादन और AI वर्क एडिटप्रोटिप्स उच्च-गुणवत्ता के परिणाम प्रदान करती है। AI वर्क एडिटप्रोटिप्स मुफ़्त योजना शुरू करें या हमारी उन्नत सदस्यता और AI वर्क एडिटप्रोटिप्स प्रीमियम योजनाओं के साथ प्रीमियम सुविधाओं का अन्वेषण करें।',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
