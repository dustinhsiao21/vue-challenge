<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: {
        input : Object,
        options: Object,
    },
    computed: {
        chartData() {
            return this.input;
        },
    },
    watch: {
        input() {
            this.renderBarChart();
        },
    },
    methods: {
        renderBarChart() {
            this.renderChart(this.chartData, this.options);
        },
    },
};
</script>

<style>
</style>