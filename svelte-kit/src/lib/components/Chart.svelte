<!-- src/lib/components/Chart.svelte -->
<script lang="ts">
    import { Bar, Line } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
  
    // Enregistrement des composants nécessaires de Chart.js
    ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);
  
    export let type: 'bar' | 'line';
    export let data: any;
    export let options: any;
</script>
  
{#if type === 'bar'}
<Bar {data} {options} />
{:else if type === 'line'}
<Line {data} {options} />
{/if}
  