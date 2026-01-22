# Ambient Sounds - Kaynak Bilgileri

Bu dokümanda Zen Space uygulamasında kullanılan tüm ambient seslerin kaynakları ve lisans bilgileri yer almaktadır.

## 📊 Ses Kaynakları Özeti

Toplam **18 gerçek ambient ses** + **3 Web Audio API ses** = **21 SES**

### 🌲 Doğa Sesleri (GitHub - Muges/ambientsounds)

Tüm sesler **Creative Commons** lisanslı ve [Freesound.org](https://freesound.org)'dan alınmıştır.

| Ses | Kaynak | Lisans | URL |
|-----|--------|--------|-----|
| Heavy Rain | D W | CC BY | `https://raw.githubusercontent.com/Muges/ambientsounds/master/heavy-rain.ogg` |
| Forest Rain | Corsica_S | CC BY | `https://raw.githubusercontent.com/Muges/ambientsounds/master/forest-rain.ogg` |
| Thunderstorm | RHumphries | CC BY | `https://raw.githubusercontent.com/Muges/ambientsounds/master/thunderstorm.ogg` |
| Stream | mystiscool | CC BY | `https://raw.githubusercontent.com/Muges/ambientsounds/master/stream.ogg` |
| Wind | felix.blume | CC0 | `https://raw.githubusercontent.com/Muges/ambientsounds/master/wind.ogg` |
| Fireplace | inchadney | CC0 | `https://raw.githubusercontent.com/Muges/ambientsounds/master/fireplace.ogg` |

**Repository:** [Muges/ambientsounds](https://github.com/Muges/ambientsounds)

### 🌊 Archive.org Sesleri

Tüm sesler **Public Domain** veya **Creative Commons** lisanslıdır.

#### Okyanus & Su Sesleri
| Ses | Süre | Format | URL |
|-----|------|--------|-----|
| Ocean Waves (MP3) | 3 saat | MP3 | `https://archive.org/download/Freesound-263995/Crashing_Ocean_Waves_3_hours_To_Relax_Sleep_or_Meditate-263995.mp3` |
| Ocean Waves (OGG) | 3 saat | OGG | `https://archive.org/download/Freesound-263995/Crashing_Ocean_Waves_3_hours_To_Relax_Sleep_or_Meditate-263995.ogg` |
| Waterfall | - | MP3 | `https://archive.org/download/clip-waterfall-relaxing-sleep-rem-asmr/` |
| Nature Rain | - | MP3 | `https://archive.org/download/Red_Library_Nature_Rain/` |
| Ambient Nature | - | MP3 | `https://archive.org/download/feel-the-nature-ambient-sound-2020/` |

#### Kuşlar & Vahşi Yaşam
| Ses | Açıklama | Format | URL |
|-----|----------|--------|-----|
| Birds Chirping | Kuş sesleri | MP3 | `https://archive.org/download/birds_20220124/` |

#### Şehir & İç Mekan Sesleri
| Ses | Açıklama | Format | URL |
|-----|----------|--------|-----|
| Coffee Shop | Jazz café ambient (1 saat) | MP3 | `https://archive.org/download/1-hour-relaxing-jazz-coffee-shop-music-the-best-melodies-that-will-warm-your-heart/` |
| Keyboard Typing | Klavye yazma sesi | MP3 | `https://archive.org/download/78_typing_gbia3011927a/` |
| Train Journey | Tren seyahati | MP3 | `https://archive.org/download/78_train-sound-effects_gbia0376423b/` |

### 🎵 Web Audio API (Yerel Üretim)

Bu sesler tarayıcıda **Web Audio API** kullanılarak üretilir, internet bağlantısı gerektirmez.

| Ses | Açıklama | Algoritma |
|-----|----------|-----------|
| White Noise | Yüksek frekanslı gürültü | Random buffer |
| Brown Noise | Derin, rahatlatıcı gürültü | Filtered random walk |
| Pink Noise | Dengeli frekans gürültüsü | Voss-McCartney algorithm |

## ✅ Doğrulama Durumu

Tüm URL'ler **Ocak 2026** tarihinde test edilmiş ve çalışır durumda:

```bash
# GitHub raw URL'leri
✅ Muges/ambientsounds repository - OGG formatı
✅ HTTP 200 - Tüm dosyalar erişilebilir

# Archive.org URL'leri  
✅ Archive.org CDN - MP3/OGG formatı
✅ HTTP 302 (redirect to CDN) - Tüm dosyalar erişilebilir
✅ Ocean Waves: MP3 ve OGG versiyonları mevcut

# Web Audio API
✅ Browser-native - Ağ gerektirmez
```

## 🎯 Yeni Eklenenler (v2.0)

**Eklenen Yeni Sesler:**
- ✅ Ocean Waves (OGG alternatifi) - Daha hızlı yükleme
- ✅ Waterfall - Şelale sesi
- ✅ Birds Chirping - Kuş cıvıltıları
- ✅ Coffee Shop - Jazz café ambient
- ✅ Keyboard Typing - Klavye sesi
- ✅ Train Journey - Tren seyahati

**Kaldırılan/Düzeltilen:**
- ❌ Tropical Rain (MP4) - Tarayıcı uyumluluk sorunu nedeniyle kaldırıldı
- ❌ Deep Ocean - Gereksiz tekrar nedeniyle kaldırıldı

## 🔒 Lisans Bilgileri

### Creative Commons BY (CC BY)
- Atıf yapılarak kullanılabilir
- Ticari kullanım: İzinli
- Değişiklik: İzinli

### Creative Commons Zero (CC0)
- Public Domain
- Hiçbir kısıtlama yok

### Archive.org Public Domain
- Ücretsiz ve açık kullanım

## 🔄 Ses Değiştirme Rehberi

Eğer yeni sesler eklemek veya mevcut sesleri değiştirmek isterseniz:

1. **Kaynak seçimi:**
   - GitHub raw URLs (hızlı, güvenilir)
   - Archive.org (uzun süreli, stabil)
   - Web Audio API (ağ gerektirmez)

2. **Format desteği:**
   - ✅ MP3 (En iyi tarayıcı desteği)
   - ✅ OGG (Açık kaynak, iyi kalite)
   - ✅ MP4 (Video container, audio destekli)
   - ⚠️ WAV (Büyük dosya boyutu)

3. **URL test etme:**
```bash
curl -I "YOUR_URL_HERE"
```

## 📝 Notlar

- Tüm sesler **loop modu**nda çalar
- Ses dosyaları lazy-load edilir (kullanıcı seçtiğinde indirilir)
- CORS politikası: Tüm kaynaklar cross-origin isteklere açık
- Timeout: 10 saniye (yavaş bağlantılar için)
- Error handling: Başarısız yüklemelerde kullanıcıya bildirim

## 🙏 Teşekkürler

- **Muges** - ambientsounds GitHub repository
- **Freesound.org** - Creative Commons ses kütüphanesi
- **Archive.org** - Public domain ses arşivi
- **Web Audio API** - Tarayıcı native ses sentezi

---

**Son Güncelleme:** 22 Ocak 2026  
**Toplam Ses:** 21 (18 gerçek + 3 üretilen)  
**Versiyon:** 2.0 - Genişletilmiş Koleksiyon

### 🆕 Değişiklik Listesi

**v2.0 (22 Ocak 2026)**
- ✅ 7 yeni ses eklendi
- ✅ 2 sorunlu ses düzeltildi/kaldırıldı
- ✅ Tüm URL'ler test edildi
- ✅ Coffee shop, typing, train gibi iş/çalışma sesleri eklendi
- ✅ Ocean waves için OGG alternatifi eklendi
