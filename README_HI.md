# DiwaPAY — हिंदी सेटअप गाइड

यह Next.js + Supabase Auth स्टार्टर है। इसमें ईमेल से Register, Login, Logout और Forgot Password शामिल हैं। अभी इसमें कोई पेमेंट प्रोसेसिंग नहीं है।

## 1. Supabase प्रोजेक्ट बनाएँ
1. Android Chrome में https://supabase.com खोलें और अकाउंट बनाएँ।
2. नया Project बनाएँ और उसका database password सुरक्षित जगह रखें।
3. प्रोजेक्ट में **Project Settings → API Keys** (या Connect) खोलें।
4. Project URL और `sb_publishable_...` publishable key कॉपी करें। `service_role` या secret key कभी वेबसाइट में न डालें।

## 2. GitHub पर कोड डालें
1. https://github.com खोलें और नया repository बनाएँ, नाम `diwapay` रख सकते हैं।
2. इस ZIP को अनज़िप करके सभी फाइलें repository में अपलोड करें। GitHub मोबाइल वेबसाइट पर **Add file → Upload files** उपयोग कर सकते हैं।
3. `README_HI.md` सहित `app`, `lib`, `package.json` आदि फाइलें repository की root में होनी चाहिए।

## 3. Vercel पर Deploy करें
1. https://vercel.com खोलें और GitHub से Sign in करें।
2. **Add New → Project** चुनें और `diwapay` repository Import करें।
3. Environment Variables में ये दो नाम डालें:
   - `NEXT_PUBLIC_SUPABASE_URL` = आपका Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = आपका Supabase publishable key
4. **Deploy** दबाएँ। Build पूरा होने पर Vercel आपको `https://...vercel.app` लिंक देगा।

## 4. Supabase में ईमेल पुष्टि और Redirect URL
1. Supabase Dashboard → Authentication → URL Configuration खोलें।
2. Site URL में अपना Vercel production URL डालें, जैसे `https://your-project.vercel.app`।
3. Redirect URLs में यही URL और जरूरत हो तो `https://your-project.vercel.app/**` जोड़ें।
4. Authentication → Sign In / Providers में Email provider चालू रखें। ईमेल पुष्टि (Confirm email) चालू रखने की सलाह है।
5. Vercel में Environment Variables बदलने पर Project को Redeploy करें।

## 5. परीक्षण
1. वेबसाइट खोलें और Register दबाएँ।
2. अपना ईमेल और मजबूत पासवर्ड डालें।
3. यदि ईमेल पुष्टि चालू है, तो ईमेल में दिए लिंक पर क्लिक करें।
4. Login करके अकाउंट पेज और Logout जाँचें।
5. Forgot Password से रीसेट ईमेल जाँचें।

## महत्वपूर्ण सुरक्षा नोट
- केवल Supabase `publishable` key को `NEXT_PUBLIC_...` के साथ रखना ठीक है। `service_role`, secret keys, database password, OTP, UPI PIN या बैंकिंग PIN को कभी सार्वजनिक कोड या चैट में साझा न करें।
- इस starter में browser-side Supabase client है। बड़े/संवेदनशील प्रोडक्शन सिस्टम के लिए Supabase SSR cookie-based session, server-side authorization, rate limiting, abuse protection, monitoring और security review जोड़ें।
- यह वेबसाइट अभी केवल अकाउंट प्रमाणीकरण का स्टार्टर है, कोई वास्तविक wallet, balance, transfer या payment gateway नहीं।
- लॉन्च से पहले Privacy Policy, Terms, सहायता संपर्क और अपने ब्रांड की कानूनी आवश्यकताएँ जोड़ें।
