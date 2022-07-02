<template>
    <div style="marginTop: 30px">
        <Section1/>
        <MoreInformation/>
    </div>
</template>

<script>
import Section1 from './StoreSection1.vue';
import MoreInformation from './StoreMoreInformation.vue';
export default {
    components: {
        Section1,
        MoreInformation,
    }
}
</script>