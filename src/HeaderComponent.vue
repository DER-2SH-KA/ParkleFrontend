<script setup lang="ts">
import { ref } from 'vue'
const isLogined = ref<boolean>(false)
</script>

<template>
  <header>
    <div id="logo">
      <img src="./resources/img/png/icon.png" alt="Icon" />
      <p>Parkle</p>
    </div>
    <div id="empty"></div>
    <div id="authButtonsContainer">
      <div v-if="!isLogined" class="authButtons">
        <button class="authButton">
          <router-link to="/login">Sing In</router-link>
        </button>
        <button class="authButton">
          <router-link to="/registration">Sing Up</router-link>
        </button>
      </div>
      <div v-else class="authButtons">
        <button class="authButton">
          <router-link to="/profile">Sing In</router-link>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-second-color-dark-theme);
}

#logo {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: auto;
  margin-left: 20px;
}

#logo > img {
  width: 30pt;
  aspect-ratio: 1;
}

#logo > p {
  color: var(--text-color-dark-theme);
  font-size: 28pt;
  margin-left: 10px;
}

#authButtonsContainer {
  display: flex;
  flex-flow: row wrap;
}

.authButtons {
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: row;
  margin-right: 5px;
}

.authButton {
  background-color: transparent;
  border: 2px var(--text-color-dark-theme) solid;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 0px;

  & > a {
    color: var(--text-color-dark-theme);
    text-align: center;
    text-decoration: none;
  }

  &:hover {
    animation: scale-to-one-dot-one ease-in-out 200ms;
    animation-fill-mode: forwards;
  }
}

@keyframes scale-to-one-dot-one {
  from {
    transform: scale(1);
  }
  to {
    color: var(--background-color-dark-theme);
    background-color: var(--text-color-dark-theme);
    border: 2px var(--background-color-dark-theme) solid;
    transform: scale(1.05);
  }
}
</style>
