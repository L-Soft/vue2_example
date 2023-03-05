<template>
  <div>
    <div class="container">
      <button class="button" @click="onClickSearch">검색</button>
      <button class="button" @click="onClickAdd">행 추가</button>
      <button class="button" @click="onClickAddValue">행 추가(값 추가)</button>
      <button class="button" @click="btnRemoveRow">행 삭제(커서)</button>
      <button class="button" @click="btnCheckInRow">체크박스 선택된 아이템 삭제</button>
    </div>
    <div ref="realgrid" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
/* eslint-disable */
import {getCurrentInstance, onMounted, reactive, ref, toRefs} from 'vue'
import axios from "axios";

export default {
  name: 'HomeComponent',
  props: {
    msg: {
      type: String
    }
  },
  setup(props, context) {
    const realgrid = ref(null);
    const vm = getCurrentInstance();

    let dataProvider, gridView;
    const realGridInit = () => {
      dataProvider = new RealGrid.LocalDataProvider();
      gridView = new RealGrid.GridView(realgrid.value);
      gridView.setDataSource(dataProvider);

      dataProvider.setFields([
        {fieldName: 'address'},
        {fieldName: 'alphanumeric'},
        {fieldName: 'country'},
        {fieldName: 'currency'},
        {fieldName: 'email'},
        {fieldName: 'id'},
        {fieldName: 'name'},
        {fieldName: 'numberrange'},
        {fieldName: 'phone'},
        {fieldName: 'postalZip'},
        {fieldName: 'region'},
        {fieldName: 'text'},
        {fieldName: 'items'},
      ]);
``
      gridView.setColumns([
        {name: 'address', fieldName: 'address', 'header': {'text': '주소'}},
        {name: 'alphanumeric', fieldName: 'alphanumeric' , 'header': {'text': '영문숫자'}},
        {name: 'country', fieldName: 'country' , 'header': {'text': '국가'}},
        {name: 'currency', fieldName: 'currency' , 'header': {'text': '재산'}},
        {name: 'email', fieldName: 'email' , 'header': {'text': '이메일'}},
        {name: 'id', fieldName: 'id' , 'header': {'text': 'id'}},
        {name: 'list', fieldName: 'list' , 'header': {'text': '항목들'}},
        {name: 'name', fieldName: 'name' , 'header': {'text': '이름'}},
        {name: 'numberrange', fieldName: 'numberrange' , 'header': {'text': '숫자'}},
        {name: 'phone', fieldName: 'phone' , 'header': {'text': '휴대번호'}},
        {name: 'postalZip', fieldName: 'postalZip' , 'header': {'text': '우편번호'}},
        {name: 'region', fieldName: 'region' , 'header': {'text': '지역'}},
        {name: 'text', fieldName: 'text' , 'header': {'text': '비고'}},
      ]);

      gridView.setColumnLayout([
        {
          name: 'gridLayout1',
          items:[
            'postalZip',
            'address',
            'country',
          ],
          header: {
            text: '주소'
          },
        },
        {
          name: 'gridLayout2',
          items:[
            'name',
            'phone',
            'alphanumeric',
            'currency',
            'email',
            'id',
            'list',
            'numberrange',
            'region',
          ],
          header: {
            text: '개인정보'
          },
        },
        'text',
      ]);

      gridView.columnByName('id').visible = false; // * 특정 컬럼 숨기기

      gridView.setHeader({ // * 헤더 높이 설정
        height: gridView.getHeader().height + 30
      });

      gridView.setDisplayOptions({ // * 컬럼 너비 자동 조정
        fitStyle: 'even'
      });

      gridView.setStateBar({ visible: false }); // * 상태바 표시 여부
      gridView.setCheckBar({ visible: true }); // & 체크 표시 여부
      gridView.setEditOptions({
        editable: true,
        insertable: true,
      }); // * 그리드 수정 모드 설정
      gridView.onEditCommit = (grid, index, oldValue, newValue) => {
        console.log('onEditCommit', grid, index, oldValue, newValue);
      }
    };

    const onClickSearch = async () => {
      try {
        const res = await axios.post('/api/selectUsers', {});
        dataProvider.setRows(res?.data?.userList);
        console.log("res", res?.data?.userList);
      } catch (e) {
        console.error(e);
      }
    };

    const onClickAdd = () => {
      const rowIndex = gridView.getCurrent().dataRow;
      dataProvider.insertRow(rowIndex === -1 ? 0 : rowIndex, {});
    };

    const onClickAddValue = () => {
      const rowIndex = gridView.getCurrent().dataRow;
      dataProvider.insertRow(rowIndex === -1 ? 0 : rowIndex, {name: '새 이름'})
    }

    const btnRemoveRow = () => {
      let rowIndex = gridView.getCurrent().dataRow;
      return rowIndex === -1 ? '' : dataProvider.removeRow(rowIndex);
    }

    const btnCheckInRow = () => {
      console.log('btnCheckInRow', dataProvider.getCheckedRows());
    };

    onMounted(() => {
      realGridInit();
    });

    return {
      onClickSearch,
      onClickAdd,
      onClickAddValue,
      btnRemoveRow,
      btnCheckInRow,
      realGridInit,
      realgrid,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.button {
  background-color: #c2c2c2; /* Green */
  border: none;
  color: #000000;
  padding: 11px 11px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-right: 5px;
  margin-bottom: 3px;
}
.container {
  display: flex;
  flex-direction: row;
}
</style>
