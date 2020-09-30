<template>
    <div class="dashboard-editor-container">

        <panel-group @handleSetLineChartData="handleSetLineChartData" />

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" />
        </el-row>

        <el-row :gutter="32">
<!--            <el-col :xs="24" :sm="24" :lg="8">-->
<!--                <div class="chart-wrapper">-->
<!--                    <raddar-chart />-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="24" :lg="8">-->
<!--                <div class="chart-wrapper">-->
<!--                    <pie-chart />-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="24" :lg="8">-->
<!--                <div class="chart-wrapper">-->
<!--                    <bar-chart />-->
<!--                </div>-->
<!--            </el-col>-->
        </el-row>

        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
                <todo-list />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
    newVisitis: {
        expectedData: [0, 1, 0, 2, 3, 1, 0],
        actualData: [0, 0, 0, 0, 1, 0, 1]
    },
    messages: {
        expectedData: [0, 0, 0, 0, 1, 0, 1],
        actualData: [0, 1, 0, 2, 3, 1, 0]
    },
    purchases: {
        expectedData: [0, 1, 0, 2, 3, 1, 0],
        actualData: [0, 1, 10, 0, 1, 0, 1]
    },
    shoppings: {
        expectedData: [0, 1, 0, 2, 3, 1, 0],
        actualData: [0, 1, 1, 0, 1, 0, 1]
    }
}

export default {
    name: 'DashboardAdmin',
    components: {
        PanelGroup,
        RaddarChart,
        LineChart,
        PieChart,
        BarChart,
        TodoList,
        BoxCard
    },
    data () {
        return {
            lineChartData: lineChartData.newVisitis
        }
    },
    methods: {
        handleSetLineChartData (type) {
            this.lineChartData = lineChartData[type]
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: #f6f6f6;
    position: relative;
    margin: -20px 0 0 -10px;

    .github-corner {
        position: absolute;
        top: 0;
        border: 0;
        right: 0;
    }

    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}

@media (max-width:1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>
