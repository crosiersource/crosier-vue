<template>
    <div id="testcompon">Label é {{ label }}</div>
</template>

<script>
export default {
    name: 'TestCompon',
    props: {
        label: {
            type: String
        },
    },
}
</script>
