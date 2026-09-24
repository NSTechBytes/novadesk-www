<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import patreonLogo from './assets/patreon.png'

const showContact = ref(false)
const showMenu = ref(false)
const version = ref('Loading...')
const downloadUrl = ref('https://github.com/Official-Novadesk/novadesk/releases/latest')

interface WidgetItem {
  name: string
  image: string
  repoUrl: string
}

const widgets: WidgetItem[] = [
  {
    name: 'CleanTime',
    image: 'https://res.cloudinary.com/i8b6ikc3/image/upload/v1790264582/zfjzk4hhfnkjjrpvm8xd.png',
    repoUrl: 'https://github.com/NSTechBytes/CleanTime'
  },
  {
    name: 'AeroWeather',
    image: 'https://res.cloudinary.com/i8b6ikc3/image/upload/v1790264581/p9kznwu99er2eypdqco9.png',
    repoUrl: 'https://github.com/NSTechBytes/AeroWeather'
  },
  {
    name: 'FineTime',
    image: 'https://res.cloudinary.com/i8b6ikc3/image/upload/v1790264581/smv6ebiy6hhcjfzrgpgh.png',
    repoUrl: 'https://github.com/NSTechBytes/FineTime'
  },
  {
    name: 'AClock',
    image: 'https://res.cloudinary.com/i8b6ikc3/image/upload/v1790264581/voovyxrymb8d0p3n2bhb.png',
    repoUrl: 'https://github.com/NSTechBytes/AClock'
  },
  {
    name: 'SmartPlayer',
    image: 'https://res.cloudinary.com/i8b6ikc3/image/upload/v1790264579/hz7uexfdpqkbjnqpteyb.jpg',
    repoUrl: 'https://github.com/NSTechBytes/SmartPlayer'
  }
]

const currentSlide = ref(0)
const currentWidget = computed<WidgetItem>(() => widgets[currentSlide.value] ?? widgets[0] as WidgetItem)
let slideTimer: ReturnType<typeof setInterval> | null = null

const showWidgetModal = ref(false)
const activeWidget = ref<WidgetItem | null>(null)

const openWidgetModal = (w?: WidgetItem) => {
  stopAutoplay()
  activeWidget.value = w || currentWidget.value
  showWidgetModal.value = true
}

const closeWidgetModal = () => {
  showWidgetModal.value = false
  startAutoplay()
}

const proceedToRelease = () => {
  if (activeWidget.value?.repoUrl) {
    window.open(`${activeWidget.value.repoUrl}/releases/latest`, '_blank', 'noopener,noreferrer')
  }
  closeWidgetModal()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % widgets.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + widgets.length) % widgets.length
}

const goToSlide = (idx: number) => {
  currentSlide.value = idx
}

const preloadImages = () => {
  widgets.forEach(widget => {
    const img = new Image()
    img.src = widget.image
  })
}

const startAutoplay = () => {
  stopAutoplay()
  slideTimer = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoplay = () => {
  if (slideTimer) {
    clearInterval(slideTimer)
    slideTimer = null
  }
}

const openContact = () => {
  showContact.value = true
}
const closeContact = () => {
  showContact.value = false
}
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

onMounted(async () => {
  preloadImages()
  startAutoplay()
  try {
    const res = await fetch('https://api.github.com/repos/Official-Novadesk/novadesk/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = await res.json()
    version.value = data.tag_name || data.name || 'Latest'
    const asset = Array.isArray(data.assets) ? data.assets.find((a: any) => a.browser_download_url) : null
    if (asset?.browser_download_url) {
      downloadUrl.value = asset.browser_download_url
    } else if (data.tarball_url) {
      downloadUrl.value = data.tarball_url
    } else if (data.zipball_url) {
      downloadUrl.value = data.zipball_url
    } else if (data.html_url) {
      downloadUrl.value = data.html_url
    }
  } catch (err) {
    version.value = 'v0.3.0.0 Beta Build'
    downloadUrl.value = 'https://github.com/Official-Novadesk/novadesk/releases/latest'
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <main class="page">
    <div class="bg-icons">
      <img src="./assets/icons/calendar.png" alt="" class="float icon-a" />
      <img src="./assets/icons/clock.png" alt="" class="float icon-b" />
      <img src="./assets/icons/music.png" alt="" class="float icon-c" />
      <img src="./assets/icons/monitor.png" alt="" class="float icon-d" />
      <img src="./assets/icons/weather.png" alt="" class="float icon-e" />
    </div>
    <nav class="glass-nav">
      <div class="nav-inner">
        <a class="brand" href="/" aria-label="Novadesk home">
          <img src="./assets/logo.png" alt="Novadesk logo" />
          <span>Novadesk</span>
        </a>
        <div class="nav-actions">
          <a class="icon-link" href="https://github.com/Official-Novadesk/novadesk" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="./assets/social/github.png" alt="GitHub" />
          </a>
          <button class="hamburger" type="button" @click="toggleMenu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="links" :class="{ open: showMenu }">
          <a href="/">Home</a>
          <a href="https://novadesk-docs.pages.dev/" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://novadesk-docs.pages.dev/changelogs/CHANGELOG.html" target="_blank" rel="noreferrer">Changelog</a>
          <a href="#" @click.prevent="openContact">Contact</a>
        </div>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-card">
        <h1>
          <span class="grad">Novadesk</span>, New Era of
          <br />
          <span class="grad">Customization</span>
        </h1>
        <p class="subtitle">Create beautiful desktop widgets with ease and a lot of possibilities</p>
        <div class="actions">
          <a class="primary" :href="downloadUrl" download>Download</a>
          <a class="ghost" href="https://novadesk-docs.pages.dev/" target="_blank" rel="noreferrer">Visit Docs</a>
        </div>
        <p class="build-tag">
          <span class="pill">Beta Build</span>
          <span class="version">{{ version }}</span>
        </p>
      </div>

      <!-- Preview Widgets Slideshow -->
      <div
        class="slideshow-wrapper"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <div class="slideshow">
          <transition name="slide-fade" mode="out-in">
            <div
              :key="currentSlide"
              class="slide clickable"
              role="button"
              tabindex="0"
              :aria-label="`Get ${currentWidget.name} Widget`"
              @click="openWidgetModal(currentWidget)"
              @keydown.enter="openWidgetModal(currentWidget)"
            >
              <img
                :src="currentWidget.image"
                :alt="currentWidget.name"
                class="slide-img"
              />
              <div class="slide-click-hint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Click to get widget</span>
              </div>
            </div>
          </transition>

          <button
            class="slide-nav prev"
            type="button"
            @click.stop="prevSlide"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            class="slide-nav next"
            type="button"
            @click.stop="nextSlide"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div
            class="slide-badge"
            role="button"
            tabindex="0"
            @click.stop="openWidgetModal(currentWidget)"
            :aria-label="`Get ${currentWidget.name} Widget`"
          >
            <span>{{ currentWidget.name }} Widget</span>
          </div>

          <div class="slide-dots">
            <button
              v-for="(w, idx) in widgets"
              :key="idx"
              class="dot"
              :class="{ active: idx === currentSlide }"
              type="button"
              :aria-label="`Go to ${w.name} slide`"
              @click="goToSlide(idx)"
            />
          </div>
        </div>
      </div>

      <!-- Patreon Support Block -->
      <section class="patreon-card">
        <div class="patreon-content">
          <div class="patreon-logo-wrapper">
            <img :src="patreonLogo" alt="Patreon Logo" class="patreon-logo" />
          </div>
          <div class="patreon-text">
            <h2>Support Us on Patreon</h2>
            <p>
              Novadesk is free and open-source. Consider supporting our development to
              unlock exclusive benefits, early build access, and custom widget perks.
            </p>
          </div>
        </div>
        <a
          class="patreon-btn"
          href="https://www.patreon.com/c/officialnovadesk"
          target="_blank"
          rel="noreferrer"
        >
          Support on Patreon
        </a>
      </section>
    </section>
  </main>
  <footer class="footer">OfficialNovadesk all rights reserved</footer>

  <div v-if="showContact" class="modal-backdrop" @click.self="closeContact">
    <div class="modal">
      <button class="icon-close" type="button" @click="closeContact" aria-label="Close">
        <img src="./assets/icons/close.png" alt="Close" />
      </button>
      <div class="modal-heading">
        <img src="./assets/icons/mail.png" alt="Mail" />
        <h2>Contact</h2>
      </div>
      <div class="email-chip">
        <span>Email:</span>
        <a href="mailto:officialnovadesk@gmail.com">officialnovadesk@gmail.com</a>
      </div>
    </div>
  </div>

  <!-- Widget Requirements & Release Modal -->
  <div v-if="showWidgetModal" class="modal-backdrop" @click.self="closeWidgetModal">
    <div class="modal widget-modal">
      <button class="icon-close" type="button" @click="closeWidgetModal" aria-label="Close">
        <img src="./assets/icons/close.png" alt="Close" />
      </button>

      <div class="widget-modal-heading">
        <div class="widget-modal-icon">
          <img src="./assets/logo.png" alt="Novadesk" />
        </div>
        <h2>{{ activeWidget?.name }} Widget</h2>
      </div>

      <div class="widget-modal-alert">
        <div class="alert-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#73F0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p class="alert-text">
          To use this widget, make sure you have installed <strong>Novadesk</strong> in your system.
        </p>
      </div>

      <p class="widget-modal-desc">
        Click below to proceed to the latest release on GitHub and download the widget package.
      </p>

      <div class="widget-modal-actions">
        <button class="btn-proceed" type="button" @click="proceedToRelease">
          <span>Okay, I do</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <a class="btn-novadesk-link" :href="downloadUrl" download>
          Don't have Novadesk? Download it here
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: rgb(12, 19, 41);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem 3.5rem;
  gap: 0.75rem;
  position: relative;
}

.bg-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-icons img {
  position: absolute;
  width: 72px;
  height: 72px;
  opacity: 0.2;
  filter: brightness(0) saturate(100%) invert(85%) sepia(55%) saturate(600%) hue-rotate(158deg) brightness(1.1) drop-shadow(0 12px 24px rgba(115, 240, 255, 0.35));
}

.float {
  animation: float 9s ease-in-out infinite;
}

.icon-a { top: 14%; left: 12%; animation-delay: 0s; }
.icon-b { top: 28%; right: 14%; animation-delay: 1.5s; }
.icon-c { bottom: 18%; left: 18%; animation-delay: 3s; }
.icon-d { bottom: 12%; right: 10%; animation-delay: 4.5s; }
.icon-e { top: 46%; left: 52%; animation-delay: 6s; }

.glass-nav {
  position: relative;
  position: sticky;
  top: 1.5rem;
  width: min(1080px, 100%);
  border-radius: 18px;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
  overflow: hidden;
  backdrop-filter: blur(16px);
  z-index: 10;
}

.nav-inner {
  position: relative;
  z-index: 11;
  min-height: 45px;
  padding: 0.6rem 1.15rem;
  border-radius: 14px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem 1.25rem;
  grid-template-areas: "brand links actions";
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #f4f4f7;
  font-weight: 700;
  letter-spacing: 0.02em;
  grid-area: brand;
  text-decoration: none;
}

.brand img {
  width: 34px;
  height: 34px;
  animation: spin-sequence 1.6s ease-out 1;
  transform-origin: center;
}

.brand span {
  font-size: 1rem;
}

.links {
  display: flex;
  justify-content: center;
  gap: clamp(0.9rem, 2vw, 1.5rem);
  color: #e7e7ed;
  font-weight: 500;
  font-size: 0.95rem;
  grid-area: links;
}

.links a {
  color: inherit;
  text-decoration: none;
  padding: 0.35rem 0.5rem;
  border-radius: 10px;
  transition: background 140ms ease, color 140ms ease;
}

.links a:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  justify-self: end;
  grid-area: actions;
}

.icon-link {
  color: #f4f4f7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  transition: transform 160ms ease;
}

.icon-link:hover {
  transform: translateY(-1px);
}

.icon-link img {
  width: 26px;
  height: 26px;
  display: block;
}

.hero {
  width: min(1080px, 100%);
  color: #f4f4f7;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  z-index: 1;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.grad {
  background: linear-gradient(45deg, #73F0FF 0%, #29D1FA 55%, #057AF0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-card {
  width: min(800px, 100%);
  padding: 1.8rem 2rem;
  border-radius: 16px;
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitle {
  margin: 0.75rem auto 0;
  max-width: 640px;
  color: #d9d9e0;
  font-size: 1.05rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.actions a {
  font: inherit;
  padding: 0.72rem 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  cursor: pointer;
  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease, background 140ms ease, color 140ms ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.actions .primary {
  background: rgba(81, 188, 254, 0.12);
  color: #eaf3ff;
  border-color: rgba(81, 188, 254, 0.5);
  box-shadow: 0 10px 30px rgba(81, 188, 254, 0.18);
}

.actions .ghost {
  background: rgba(255, 255, 255, 0.03);
  color: #f4f4f7;
}

.actions a:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
}

.actions .ghost:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.build-tag {
  margin: 0.9rem 0 0;
  color: #9fa2b8;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.build-tag .pill {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e7e7ed;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.build-tag .version {
  color: #c7c8d3;
}

.footer {
  width: 100%;
  text-align: center;
  color: #7e8197;
  font-size: 0.9rem;
  padding: 1.5rem 0 2rem;
  letter-spacing: 0.01em;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 10;
}

.modal {
  position: relative;
  background: #1f1f24;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.9rem 2rem 1.8rem;
  min-width: 380px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.modal h2 {
  margin: 0 0 0.5rem;
  color: #f4f4f7;
}

.modal p {
  margin: 0.25rem 0 0.2rem;
  color: #d9d9e0;
}

.email-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.9rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  margin-top: 0.4rem;
}

.email-chip a {
  color: #e7e7ed;
  text-decoration: none;
}

.email-chip span {
  color: #fff;
}

.modal a {
  color: #7cc3ff;
}

.modal-heading {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.05rem;
  line-height: 1;
}

.modal-heading img {
  width: 26px;
  height: 26px;
}

/* Widget Modal */
.widget-modal {
  max-width: 440px;
  width: 90%;
  background: #141c2e;
  border: 1px solid rgba(81, 188, 254, 0.38);
  border-radius: 20px;
  padding: 2.2rem 2rem 2rem;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.65), 0 0 35px rgba(56, 189, 248, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.widget-modal-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.widget-modal-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.widget-modal-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.widget-modal-heading h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
}

.widget-modal-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(81, 188, 254, 0.28);
  border-radius: 14px;
  padding: 1rem 1.15rem;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
}

.widget-modal-alert .alert-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.widget-modal-alert .alert-text {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.5;
  color: #e2e8f0;
}

.widget-modal-alert .alert-text strong {
  color: #73F0FF;
  font-weight: 600;
}

.widget-modal-desc {
  margin: 0.1rem 0;
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.5;
}

.widget-modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  margin-top: 0.4rem;
}

.btn-proceed {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  background: linear-gradient(90deg, #00C6FF 0%, #1E90FF 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 198, 255, 0.38);
  transition: all 0.2s ease;
}

.btn-proceed:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 198, 255, 0.55);
  filter: brightness(1.06);
}

.btn-novadesk-link {
  color: #73F0FF;
  font-size: 0.86rem;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.btn-novadesk-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.icon-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.icon-close img {
  width: 100%;
  height: 100%;
  display: block;
  filter: brightness(0) invert(1);
}

@keyframes spin-sequence {
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }
  30% {
    transform: rotate(-360deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(720deg) scale(1.12);
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-14px);
  }
  100% {
    transform: translateY(0px);
  }
}

.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px 9px;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.hamburger span {
  display: block;
  height: 2px;
  background: #f4f4f7;
  border-radius: 999px;
}

/* Slideshow styles */
.slideshow-wrapper {
  width: min(720px, 100%);
  margin-top: 2rem;
  position: relative;
  user-select: none;
}

.slideshow {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9.6;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(10, 18, 36, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55), 0 0 35px rgba(56, 189, 248, 0.12);
}

.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.slide.clickable {
  cursor: pointer;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.slide.clickable:hover .slide-img {
  transform: scale(1.03);
}

.slide-click-hint {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(11, 20, 38, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(81, 188, 254, 0.35);
  border-radius: 999px;
  padding: 0.38rem 0.85rem;
  color: #73F0FF;
  font-size: 0.82rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.25s ease;
  pointer-events: none;
  z-index: 4;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.slide.clickable:hover .slide-click-hint {
  opacity: 1;
  transform: translateY(0);
}

.slide-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(13, 20, 36, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 5;
  padding: 0;
}

.slide-nav.prev {
  left: 16px;
}

.slide-nav.next {
  right: 16px;
}

.slide-nav:hover {
  background: rgba(56, 189, 248, 0.35);
  border-color: rgba(56, 189, 248, 0.7);
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
}

.slide-badge {
  position: absolute;
  bottom: 16px;
  left: 18px;
  background: rgba(11, 19, 36, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 0.42rem 1.05rem;
  color: #f1f5f9;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  z-index: 4;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.slide-badge:hover {
  background: rgba(56, 189, 248, 0.28);
  border-color: rgba(56, 189, 248, 0.6);
  transform: translateY(-1px);
}

.slide-dots {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 4;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.7);
}

.dot.active {
  background: #00C6FF;
  box-shadow: 0 0 12px rgba(0, 198, 255, 0.85);
  width: 22px;
  border-radius: 999px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.35s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

/* Patreon Support Block */
.patreon-card {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  width: min(980px, 100%);
  box-sizing: border-box;
  border-radius: 22px;
  background: rgba(12, 22, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(81, 188, 254, 0.45);
  box-shadow: 0 0 35px rgba(56, 189, 248, 0.28), inset 0 0 20px rgba(56, 189, 248, 0.08), 0 15px 40px rgba(0, 0, 0, 0.45);
  padding: 1.6rem 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  text-align: left;
}

.patreon-content {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  flex: 1;
}

.patreon-logo-wrapper {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.patreon-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(255, 66, 77, 0.25);
}

.patreon-text h2 {
  margin: 0 0 0.35rem 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.patreon-text p {
  margin: 0;
  font-size: 0.93rem;
  color: #9fa2b8;
  line-height: 1.5;
  max-width: 620px;
}

.patreon-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF6448 0%, #FF424D 100%);
  color: #ffffff;
  text-decoration: none;
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  box-shadow: 0 6px 22px rgba(255, 66, 77, 0.45);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.patreon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(255, 66, 77, 0.65);
  filter: brightness(1.06);
}

@media (max-width: 780px) {
  .nav-inner {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "brand . actions"
      "links links links";
    row-gap: 0.5rem;
    min-height: 42px;
    padding: 0.5rem 0.9rem;
  }

  .brand {
    grid-area: brand;
  }

  .nav-actions {
    grid-area: actions;
    justify-self: end;
    gap: 0.5rem;
  }

  .hamburger {
    display: inline-flex;
    width: 36px;
    height: 36px;
    padding: 8px 7px;
  }

  .icon-link {
    display: inline-flex;
    width: 32px;
    height: 32px;
  }

  .links {
    grid-area: links;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 180ms ease;
  }

  .links.open {
    max-height: 160px;
  }

  /* Responsive Slideshow */
  .slideshow-wrapper {
    margin-top: 1.5rem;
  }

  .slideshow {
    border-radius: 16px;
  }

  .slide-nav {
    width: 32px;
    height: 32px;
  }

  .slide-nav.prev {
    left: 10px;
  }

  .slide-nav.next {
    right: 10px;
  }

  .slide-badge {
    bottom: 12px;
    left: 12px;
    font-size: 0.78rem;
    padding: 0.32rem 0.75rem;
  }

  .slide-dots {
    bottom: 14px;
  }

  /* Responsive Patreon Card */
  .patreon-card {
    margin-top: 2.5rem;
    padding: 1.5rem 1.25rem;
    flex-direction: column;
    text-align: center;
    gap: 1.35rem;
  }

  .patreon-content {
    flex-direction: column;
    text-align: center;
    gap: 0.85rem;
  }

  .patreon-logo-wrapper {
    margin: 0 auto;
  }

  .patreon-text h2 {
    font-size: 1.22rem;
  }

  .patreon-btn {
    width: 100%;
    max-width: 280px;
    align-self: center;
  }

  /* Responsive Widget Modal */
  .widget-modal {
    padding: 1.8rem 1.35rem 1.6rem;
    min-width: unset;
    width: 100%;
    max-width: 360px;
  }

  .widget-modal-heading h2 {
    font-size: 1.25rem;
  }

  .widget-modal-alert {
    padding: 0.85rem 1rem;
  }

  .widget-modal-alert .alert-text {
    font-size: 0.88rem;
  }
}
</style>
