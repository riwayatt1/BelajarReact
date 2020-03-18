import {
  Row, Input, Col, List, Avatar, Divider,Form, Select, InputNumber, 
} from 'antd';
import { AccountBookFill }  from '@ant-design/icons';
import React from 'react';
import './App.css';
import Loading from './components/Loader';
import Services from './utils/Api';
import ModalUsers from './components/ModalWrapper';
var numeral = require("numeral");
const { Option } = Select;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
      isLoading: false,
      selectedTicket: '',
      hargaHargaTiket: "",
      chooseHargaTiketValue: "",
      totalTiket: "",
      modalVisibleBuy: false
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => [
    new Services().get('users').then((users) => {
      console.log('res', users);
      this.setState({
        users,
      });
    })
  ]

  handleOnChange = (e) => {
    this.setState({
      search: e.target.value
    }, () => {
      new Services().get('users').then(( data ) => {
        console.log('resa', data);
        let newList = [];
        let currentList = [...data];
        newList = currentList.filter(item => {
          const lc = item.name.toLowerCase();
          console.log('lc', lc)
          const filter = this.state.search.toLowerCase();
          return lc.includes(filter);
        });
        this.setState({
          users: newList,
        });
      })
    })
  }

  handleDetailPerson = (item = []) => {
    console.log('kena', item, this.props)
    this.props.history.push({pathname:'profile', search: `?id=${item.id}` });
  }

  showModal = (item = []) => {
    this.setState({
      modalVisibleBuy : true
    });
  };

  handleOnOk = () => { 
    alert('OK');
    this.setState({
      modalVisibleBuy : false
    });
  };

  handleOnCancel = () => {
    this.setState({
      modalVisibleBuy : false
    });
   };

   handleTiketOnChange = (value) => {
    console.log(`selected ${value}`);
    if(value == "Stage A"){
      this.setState({ 
        hargaHargaTiket : 10000000,
        totalTiket : 10000000 * this.state.chooseHargaTiketValue
      });
    }else if(value == "Stage B"){
      this.setState({ 
        hargaHargaTiket : 5000000,
        totalTiket : 5000000 * this.state.chooseHargaTiketValue
      });
    }else if(value == "Stage C"){
      this.setState({ 
        hargaHargaTiket : 2000000,
        totalTiket : 2000000 * this.state.chooseHargaTiketValue
      });
    }else{
      this.setState({ 
        hargaHargaTiket : 0});
    }
    
   }

   handleJumlahOnChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ 
      chooseHargaTiketValue : value,
      totalTiket : this.state.hargaHargaTiket * value
    });
   };
  

  render() {

    const {
      totalTiket,
      modalVisibleBuy,
      hargaHargaTiket,
      chooseHargaTiketValue,
      chooseHargaTiketLabel
    } = this.state;

    
    return (
      <>
      <ModalUsers visible={this.state.modalVisibleBuy} onOk={this.handleOnOk} onCancel={this.handleOnCancel}>
        <Col span={24}>
          <Form.Item label="Pilih Tiket">        
            <Select defaultValue="Pilih Tiket" style={{ width: 120 }} onChange={this.handleTiketOnChange}>
              <Option value="Stage A">Stage A</Option>
              <Option value="Stage B">Stage B</Option>
              <Option value="Stage C">Stage C</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Harga Tiket">
            <Input addonBefore="Rp" value={numeral(this.state.hargaHargaTiket).format('0,.00')} disabled/>
          </Form.Item>
          <Form.Item label="Jumlah Tiket">
            <InputNumber min={0} defaultValue={0} onChange={this.handleJumlahOnChange} />
          </Form.Item>
          <Form.Item label="Total">
            <Input value={numeral(this.state.totalTiket).format('0,.00')} addonBefore="Rp" disabled/>
          </Form.Item>
        </Col>
      </ModalUsers>
        <div className="container">
          <Row>
            <Col span={8}>
              <Input value={this.state.search} onChange={this.handleOnChange} placeholder="Masukkan Nama" />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
            <Divider dashed />
            
            <List
              itemLayout="horizontal"
              dataSource={this.state.users}
              renderItem={(item) => (
                <List.Item 
                actions={[
                  <a onClick={() => this.showModal(item)}>Buy</a>
                 ]}
                 >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a onClick={() => this.handleDetailPerson(item)}>{item.name}</a>}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default App;