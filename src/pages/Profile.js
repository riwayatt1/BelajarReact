import React from 'react';
import qs from 'query-string';
import {
  List, Avatar, Icon, Row, Col, Button, Card, Descriptions,
} from 'antd';
import Services from '../utils/Api';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { id } = qs.parse(search);
    console.log('id', id);
    new Services().get(`users/${id}`).then((data) => {
      console.log('data', data.name);
      this.setState({ data });
    });
  }

  handleClickItem =() =>{
      const cloneState = this.state.data;
      cloneState.name = this.state.data.name + " " + this.state.data.email;
      this.setState({data: cloneState});
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <Row>
          <Col style={{ marginTop: 50, marginBottom: 50 }} offset={2} span={14}>
            <Card title={this.state.data.name}>
              <Row>
                <Col offset={1} span={24}>
                  <Descriptions style={{ marginTop: 20 }} title="User Info">
                    <Descriptions.Item label="UserName">
                      <a onClick={this.handleClickItem}>{this.state.data.name}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Telephone">
                      1810000000
                    </Descriptions.Item>
                    <Descriptions.Item label="Live">
                      Hangzhou, Zhejiang
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang,
                      China
                    </Descriptions.Item>
                  </Descriptions>
                </Col>


              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Profile;
