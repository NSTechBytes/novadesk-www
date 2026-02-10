<script setup lang="ts">
import { onMounted, ref } from 'vue'

const showContact = ref(false)
const showMenu = ref(false)
const version = ref('Loading...')
const downloadUrl = ref('https://github.com/Official-Novadesk/novadesk/releases/latest')

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
          <a href="https://novadesk-docs.pages.dev/changelog/" target="_blank" rel="noreferrer">Changelog</a>
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
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #1B1B1F;
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
  opacity: 0.08;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35));
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
  background: linear-gradient(120deg, #51BCFE, #BD34FE);
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
}
</style>
