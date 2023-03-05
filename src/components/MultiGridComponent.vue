<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <h3>{{ item.name }}</h3>
      <div class="container">
        <button class="button" @click="onExcelDownload(index)">엑셀다운로드</button>
        <button class="button" @click="onAllMultiExcelDownload">전체 사업장 엑셀다운로드</button>
      </div>
      <div :ref="el => {divs[index]  = el}" style="width: 100%; height: 500px"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import {onBeforeUpdate, onMounted, ref} from "vue";

export default {
  name: "MultiGridComponent",
  props: {
    items: Array
  },
  setup(props, context) {
    const divs = ref([]);

    let _grids = [];
    const onExcelDownload = (index) => {
      console.log('onExcelDownload', index);

      const currentGrid = _grids.filter(v => v.index === index);
      if (currentGrid === null || currentGrid === undefined || currentGrid.length === 0) {
        return;
      }

      currentGrid[0].gridViewId.columnByName('gender').mergeRule = {};
      currentGrid[0].gridViewId.columnByName('korCountry').mergeRule = {};

      currentGrid[0].gridViewId.exportGrid({
        type: "excel",
        target: "local",
        fileName: `gridExportSample_${index}.xlsx`,
        progressMessage: "엑셀 Export중입니다.",
        done: function () {  //내보내기 완료 후 실행되는 함수
          alert(`done excel export ${index}`);
        }
      });

      currentGrid[0].gridViewId.columnByName('gender').mergeRule = {
        criteria: 'value'
      };
      currentGrid[0].gridViewId.columnByName('korCountry').mergeRule = {
        criteria: 'values["gender"] + value'
      };
    };

    const onAllMultiExcelDownload = () => {
      RealGrid.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '(전체)사업장들.xlsx',
        progressMessage: "엑셀 Export중입니다.",
        done: function () {
          alert(`엑셀다운로드가 완료되었습니다.`);
        },
        exportGrids: _grids.map((v, index) => {
          return {
            grid: v.gridViewId,
            sheetName: `사업장 ${index}`
          }
        }),
      })
    };

    const gridInit = (divId, index) => {
      const dataProviderId = new RealGrid.LocalDataProvider();
      const gridViewId = new RealGrid.GridView(divId);
      gridViewId.setDataSource(dataProviderId);

      dataProviderId.setFields([
        { fieldName:'age', dataType: 'number' },
        { fieldName:'cardNumber', dataType: 'text' },
        { fieldName:'currentSave', dataType: 'text' },
        { fieldName:'endDate', dataType: 'datetime', datetimeFormat: 'yyyy-MM-dd', amText: '오전', pmText: '오후', },
        { fieldName:'gender', dataType: 'text' },
        { fieldName:'interestRate', dataType: 'number' },
        { fieldName:'korCountry', dataType: 'text' },
        { fieldName:'korName', dataType: 'text' },
        { fieldName:'monetary', dataType: 'text' },
        { fieldName:'month', dataType: 'number' },
        { fieldName:'orderDate', dataType: 'datetime', datetimeFormat: 'yyyy-MM-dd', amText: '오전', pmText: '오후', },
        { fieldName:'phone', dataType: 'text' },
        { fieldName:'productId', dataType: 'text' },
        { fieldName:'saveCost', dataType: 'text' },
        { fieldName:'saveMaturity', dataType: 'text' },
        { fieldName:'startDate', dataType: 'text' },
        { fieldName:'toMonth', dataType: 'number' },
        { fieldName:'year', dataType: 'number' },
      ]);

      gridViewId.setColumns([
        { name: 'age', fieldName: 'age', width: 100, header: { text: '나이' }, },
        { name: 'cardNumber', fieldName: 'cardNumber', width: 100, header: { text: '' }, },
        { name: 'currentSave', fieldName: 'currentSave', width: 100, header: { text: '현재잔액' }, },
        { name: 'endDate', fieldName: 'endDate', width: 100, header: { text: '종료일' }, },
        {
          name: 'gender',
          fieldName: 'gender',
          width: 30,
          header: {
            text: '성별',
            styleName: 'orange-column',
          },
          mergeRule: {
            criteria: 'value',
          },
        },
        {
          name: 'korCountry',
          fieldName: 'korCountry',
          width: 100,
          header: {
            text: '투자국가',
            styleName: 'orange-column',
          },
          mergeRule: {
            criteria: 'values["gender"] + value',
          },
        },
        { name: 'interestRate', fieldName: 'interestRate', width: 50, nubmerFormat: '0.00', header: { text: '이율' }, },
        { name: 'korName', fieldName: 'korName', width: 100, header: { text: '이름' }, },
        { name: 'monetary', fieldName: 'monetary', width: 100, header: { text: '통화' }, },
        { name: 'month', fieldName: 'month', width: 100, header: { text: '남은 횟수' }, },
        { name: 'orderDate', fieldName: 'orderDate', width: 100, header: { text: '' }, },
        { name: 'phone', fieldName: 'phone', width: 100, header: { text: '전화번호' }, },
        { name: 'productId', fieldName: 'productId', width: 100, header: { text: '' }, },
        { name: 'saveCost', fieldName: 'saveCost', width: 100, header: { text: '납일금' }, },
        { name: 'saveMaturity', fieldName: 'saveMaturity', width: 100, header: { text: '만기금액' }, },
        { name: 'startDate', fieldName: 'startDate', width: 100, header: { text: '최초납일일' }, },
        { name: 'toMonth', fieldName: 'toMonth', width: 100, header: { text: '' }, },
        { name: 'year', fieldName: 'year', width: 100, header: { text: '' }, },
      ]);

      gridViewId.columnByName("month").numberFormat = "#,##0.##;,;.;f"; // 소수점 자동 반올림 막기
      gridViewId.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
      gridViewId.displayOptions.rowHeight = 20;
      gridViewId.header.height = 32;
      gridViewId.footer.height = 32;
      gridViewId.stateBar.width = 16;
      gridViewId.editOptions.insertable = false;
      gridViewId.editOptions.appendable = false;
      gridViewId.setDisplayOptions({ // * 컬럼 너비 자동 조정
        fitStyle: 'even'
      });
      gridViewId.setStateBar({ visible: false }); // * 상태바 표시 여부
      gridViewId.setCheckBar({ visible: true }); // & 체크 표시 여부
      dataProviderId.setRows(props?.items[index].list);

      _grids.push({
        index: index,
        dataProviderId,
        gridViewId,
      });
    };

    onMounted(() => {
      for (let iCnt = 0, length = divs.value.length; iCnt < length; iCnt++) {
        gridInit(divs.value[iCnt], iCnt);
      }
    });

    onBeforeUpdate(() => {
      divs.value = [];
    });

    return {
      onExcelDownload,
      onAllMultiExcelDownload,
      divs,
    };
  },
}
</script>

<style scoped lang="scss">
.button {
  background-color: #c2c2c2; /* Green */
  border: none;
  color: #000000;
  padding: 11px 11px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
}
.container {
  display: flex;
  flex-direction: row;
}
</style>