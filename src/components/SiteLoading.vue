<template>
  <div class="loading-container">
    <div class="pax-loading-modal">
      <div class="pax-loading-modal__spinner"></div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.loading-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

@-webkit-keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.pax-loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.pax-loading-modal__spinner {
  position: relative;
  width: 80px;
  height: 80px;
  background-color: #0678be;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.pax-loading-modal__spinner:after {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  border: 3px solid #f18b18;
  content: '';
  display: block;
  height: 40px;
  width: 40px;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  -webkit-animation: spin 0.4s linear infinite;
  animation: spin 0.4s linear infinite;
}
/* .fade-enter .pax-loading-modal__spinner,
.fade-leave-to .pax-loading-modal__spinner {
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */

.toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
}
</style>
