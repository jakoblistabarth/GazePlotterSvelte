<script lang="ts">
    export let title: string
    export let maxWidth: string = '900px'
</script>

<div class="plot" style="max-width: {maxWidth}">
    <div class="header">
        <h3>{title}</h3>
        <slot name="header"></slot>
    </div>
    <div class="body">
        <slot name="body"></slot>
    </div>
</div>

<style>
    .plot {
        border-radius: 20px;
        box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        background: var(--c-darkgrey);
        flex-wrap: wrap;
        gap: 0 20px;
    }
    .body {
        padding: 30px;
    }
    h3 {
        margin: 5px 0 0;
    }
</style>
