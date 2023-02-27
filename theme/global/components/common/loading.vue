<template>
    <div class="loader-circle">
        <p class="loader-content">LOADING</p>
        <div class="loader-line-mask">
            <div class="loader-line"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>  
.loader-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px       rgba(255,255,255,0.1);
  margin-left: -60px;
  margin-top: -60px;
}
.loader-content{
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -100%);
  color: black;
  font-family: Arial, sans-serif;
}
.loader-line-mask {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60px;
  height: 120px;
  margin-left: -60px;
  margin-top: -60px;
  overflow: hidden;
  transform-origin: 60px 60px;
  -webkit-mask-image: -webkit-linear-gradient(top,#000000,rgba(0,0,0,0));
  animation: rotate 1.2s infinite linear;
}
.loader-line-mask .loader-line {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px black;
}
@keyframes rotate { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);}}
</style>

<script>
export default {
    
}
</script>