<!-- App.vue -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })
const translateDate = ref(false)

const switchLanguage = () => {
  locale.value === 'en' ? (locale.value = 'uk') : (locale.value = 'en')
  localStorage.setItem('lang', locale.value)
  translateDate.value = true
  
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">{{ $t('weather') }}</RouterLink>
        <RouterLink to="/favorites">{{ $t('favorites') }}</RouterLink>
      </nav>
    </div>
  </header>
  <button @click="switchLanguage" class="switch-btn">{{ $t('switchLang') }}</button>

  <RouterView />
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.switch-btn {
  background-color: aqua;
  padding: 10px;
}
.switch-btn:hover {
  background-color: aquamarine;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  background-color: lightgreen;
  padding: 20px;
}

nav a.router-link-exact-active {
  color: #3200ed;
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: large;
  font-weight: bold;
  text-decoration: none;
  color: black;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

nav a:first-of-type {
  border: 0;
}

nav a:hover {
  color: red;
  transform: scale(1.1);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;

    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
