# Jotform Frontend Challenge Project

## User Information
Please fill in your information after forking this repository:

- **Name**: [Aybüke Zeren]

## Project Description
Bu proje, Jotform API'den gelen farkli kaynaklardaki (Checkins, Messages, Sightings, Personal Notes, Anonymous Tips) kayitlari tek bir sorusturma panelinde birlestiren bir React + TypeScript uygulamasidir.

Uygulama icinde:
- Tüm formlardan veri paralel olarak çekilir ve normalize edilir.
- Veriler kronolojik timeline formatina dönüştürülür.
- Kişi ve lokasyon listeleri otomatik olarak çıkarılır.
- Anasayfada "PODO NEREDE?" temalı vaka özeti, timeline, lokasyon pin panosu ve kaynak grupları görüntülenir.
- Sol taraftaki şüpheli listesi ile kişi detay sayfasına geçilir.
- Kişi detay sayfasinda ilgili tüm olaylar incelenir.

## Getting Started

1. Repoyu klonlayin:
   - `git clone https://github.com/cemjotform/2026-frontend-challenge-ankara.git`
2. Proje klasörüne girin:
   - `cd 2026-frontend-challenge-ankara`
3. Bağımlılıkları kurun:
   - `npm install`
4. Ortam değişkeni dosyası olusturun:
   - Proje kokune `.env.local` dosyası ekleyin.
   - İçine şu satırı yazın:
     - `VITE_JOTFORM_API_KEY=YOUR_JOTFORM_API_KEY`
5. Geliştirme sunucusunu başlatın:
   - `npm run dev`

## Test / Build
Projeyi test ederken veya teslimden once dogrulama icin:

- Tip kontrol + production build:
  - `npm run build`
- Build sonrasi onizleme:
  - `npm run preview`

## Notlar
- Jotform API key zorunludur; key yoksa veya limit dolmuşsa veri gelmeyebilir.
- Farklı makinelerde aynı sonucu almak icin `npm install` sonrasi `.env.local` icine gecerli bir API key eklenmelidir.
- Eger API limit hatasi (`429 API-Limit exceeded`) alinirse farkli bir Jotform key ile tekrar denenmelidir.
- Proje Node.js'in guncel LTS surumuyle (onerilen: 18+) sorunsuz calisir.

# 🚀 Challenge Duyurusu

## 📅 Tarih ve Saat
Cumartesi günü başlama saatinden itibaren üç saattir.

## 🎯 Challenge Konsepti
Bu challenge'da, size özel hazırlanmış bir senaryo üzerine web uygulaması geliştirmeniz istenecektir. Challenge başlangıcında senaryo detayları paylaşılacaktır.Katılımcılar, verilen GitHub reposunu fork ederek kendi geliştirme ortamlarını oluşturacaklardır.

## 📦 GitHub Reposu
Challenge için kullanılacak repo: https://github.com/cemjotform/2026-frontend-challenge-ankara

## 🛠️ Hazırlık Süreci
1. GitHub reposunu fork edin
2. Tercih ettiğiniz framework ile geliştirme ortamınızı hazırlayın
3. Hazırladığınız setup'ı fork ettiğiniz repoya gönderin

## 💡 Önemli Notlar
- Katılımcılar kendi tercih ettikleri framework'leri kullanabilirler
