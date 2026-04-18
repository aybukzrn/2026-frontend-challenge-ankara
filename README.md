# Jotform Frontend Challenge Project

## User Information

- **Name**: [Aybüke Zeren]

## Project Description
Bu proje, Jotform API'den gelen farkli kaynaklardaki (Checkins, Messages, Sightings, Personal Notes, Anonymous Tips) kayıtlari tek bir sorusturma panelinde birlestiren bir React + TypeScript uygulamasıdır.

Uygulama icinde:
- Tüm formlardan veri paralel olarak çekilir ve normalize edilir.
- Veriler kronolojik timeline formatina dönüştürülür.
- Kişi ve lokasyon listeleri otomatik olarak çıkarılır.
- Anasayfada "PODO NEREDE?" temalı vaka özeti, timeline, lokasyon pin panosu ve kaynak grupları görüntülenir.
- Sol taraftaki şüpheli listesi ile kişi detay sayfasına geçilir.
- Kişi detay sayfasinda ilgili tüm olaylar incelenir.

## Localde Nasıl Çalıştırılır

### Gereksinimler
- **Node.js** v18 veya üzeri ([nodejs.org](https://nodejs.org) adresinden indirilebilir)
- **npm** (Node.js ile birlikte gelir)
- Geçerli bir **Jotform API Key**

### Kurulum Adımları

```bash
# 1. Repoyu klonlayın
git clone https://github.com/aybukzrn/2026-frontend-challenge-ankara.git

# 2. Proje klasörüne girin
cd 2026-frontend-challenge-ankara

# 3. Bağımlılıkları yükleyin
npm install
```

### Ortam Değişkeni Ayarı

Proje kökünde `.env.local` dosyası oluşturun ve Jotform API key'inizi ekleyin:

```
VITE_JOTFORM_API_KEY=YOUR_JOTFORM_API_KEY
```

### Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

### Build ve Önizleme

```bash
# Tip kontrol + production build
npm run build

# Build sonrası önizleme
npm run preview
```

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
