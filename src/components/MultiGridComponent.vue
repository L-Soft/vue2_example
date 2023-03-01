<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <h3>{{ item.name }}</h3>
      <div class="container">
        <button class="button" @click="onExcelDownload(index)">엑셀다운로드</button>
        <button class="button" @click="onMultiExcelDownload">멀티 다운로드 엑셀다운로드</button>
        <button class="button" @click="onAllMultiExcelDownload">전체 사업장 엑셀다운로드</button>
      </div>
      <div ref="item" style="width: 100%; height: 500px"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "MultiGridComponent",
  props: {
    items: Array
  },
  data() {
    return {
      currentItems: [],
    }
  },
  watch: {
  },
  methods: {
    onExcelDownload(index) {
      console.log('onExcelDownload', index);

      const self = this;
      const gridViewId = 'gridView_' + index;

      self[gridViewId].columnByName('gender').mergeRule = {};
      self[gridViewId].columnByName('korCountry').mergeRule = {};

      self[gridViewId].exportGrid({
        type: "excel",
        target: "local",
        fileName: `gridExportSample_${index}.xlsx`,
        progressMessage: "엑셀 Export중입니다.",
        done: function () {  //내보내기 완료 후 실행되는 함수
          alert(`done excel export ${index}`);
        }
      });

      self[gridViewId].columnByName('gender').mergeRule = {
        criteria: 'value'
      };
      self[gridViewId].columnByName('korCountry').mergeRule = {
        criteria: 'values["gender"] + value'
      };
    },
    onMultiExcelDownload(index) {
      const self = this;
      RealGrid.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '사업장들.xlsx',
        progressMessage: "엑셀 Export중입니다.",
        separateRows: true,
        done: function () {
          alert(`엑셀다운로드가 완료되었습니다.`);
        },
        exportGrids: [
          {
            grid: self['gridView_' + 0],
            sheetName: "사업장0"
          },
          {
            grid: self['gridView_' + 1],
            sheetName: "사업장1"
          },
        ],
      })
    },
    onAllMultiExcelDownload() {
      const self = this;

      let iCnt = this.items.length - 1, grids = [];
      for (; iCnt >= 0; iCnt--) {
        grids.push({
          grid: self['gridView_' + iCnt],
          sheetName: `사업장 ${iCnt},`
        });
      }

      RealGrid.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '(전체)사업장들.xlsx',
        progressMessage: "엑셀 Export중입니다.",
        done: function () {
          alert(`엑셀다운로드가 완료되었습니다.`);
        },
        exportGrids: grids,
      })
    },
    gridInit(divId, iCnt) {
      const self = this;
      const dataProviderId = 'dataProvider_' + iCnt;
      const gridViewId = 'gridView_' + iCnt;

      self[dataProviderId] = new RealGrid.LocalDataProvider();
      self[gridViewId] = new RealGrid.GridView(divId);
      self[gridViewId].setDataSource(self[dataProviderId]);

      self[dataProviderId].setFields([
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

      self[gridViewId].setColumns([
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

      self[gridViewId].columnByName("month").numberFormat = "#,##0.##;,;.;f"; // 소수점 자동 반올림 막기
      self[gridViewId].displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
      self[gridViewId].displayOptions.rowHeight = 20;
      self[gridViewId].header.height = 32;
      self[gridViewId].footer.height = 32;
      self[gridViewId].stateBar.width = 16;
      self[gridViewId].editOptions.insertable = false;
      self[gridViewId].editOptions.appendable = false;
      self[gridViewId].setDisplayOptions({ // * 컬럼 너비 자동 조정
        fitStyle: 'even'
      });
      self[gridViewId].setStateBar({ visible: false }); // * 상태바 표시 여부
      self[gridViewId].setCheckBar({ visible: true }); // & 체크 표시 여부

      self[dataProviderId].setRows(this?.items[iCnt].list);
    },
  },
  mounted() {
    for (let iCnt = 0, length = this?.$refs?.item?.length; iCnt < length; iCnt++) {
      this.gridInit(this?.$refs?.item[iCnt], iCnt);
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  background-color: #c2c2c2; /* Green */
  border: none;
  color: #000000;
  padding: 15px 32px;
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