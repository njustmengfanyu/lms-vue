<template>
    <div class="side">
        <div class="left">l</div>
        <div class="right">r</div>
    </div>


</template>

<script>
export default {
    name: "show"
}
</script>

<style scoped>
.side {
    margin: 0;
    width:100%;
    background-color: #fc8787;
    box-sizing: border-box ;
    position: relative;
    padding: 0 0 0 100px;

}
.left {
    width: 100px;
    position: absolute;
    height: 100%;
}
.right {
    width: 100%;
    background-color: #3a8ee6;
    height: 100%;
}
</style>
