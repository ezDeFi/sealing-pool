import React from 'react' // eslint-disable-line
import LoggedInPage from '../LoggedInPage'
import Footer from '@/module/layout/Footer/Container' // eslint-disable-line
import Tx from 'ethereumjs-tx' // eslint-disable-line
import { Link } from 'react-router-dom' // eslint-disable-line
import web3 from 'web3'

import './style.scss'

import { Col, Row, Icon, Button, Breadcrumb, Input, InputNumber } from 'antd' // eslint-disable-line

const weiToEther = (wei) => {
  return Number(web3.utils.fromWei(wei.toString())).toFixed(4)
}

export default class extends LoggedInPage {
  componentDidMount () {
    this.loadData()
  }

  loadData () {
    // this.props.getBalance()
    // this.props.getTokenBalance(this.props.currentAddress)
    // this.props.getDepositedBalance()
    // this.props.getStatus()
    // this.props.getCoinbase()
    // this.props.getAllowance()
  }

  getStatus (status) {
    switch (status) {
      case 0: return 'Ready'
      case 1: return 'Active'
      case 2: return 'Inactive'
      case 3: return 'Withdrawn'
      case 127: return 'Penalized'
      default: return 'Unknown'
    }
  }

  ord_renderContent () { // eslint-disable-line
    return (
      <div className="">
        <div className="ebp-header-divider">
        </div>

        <div className="ebp-page">
          <h3 className="text-center">Pool's Maker</h3>
          <div className="ant-col-md-18 ant-col-md-offset-3 text-alert" style={{ 'textAlign': 'left' }}>
            <div className="ebp-header-divider dashboard-rate-margin">
              <Row>
                <Col span={6}>
                  Owner
                </Col>
                <Col span={18}>
                  <Input
                    value={this.state.owner}
                    onChange={this.onOwnerChange.bind(this)}
                  />
                </Col>
              </Row>

              <Row style={{ 'marginTop': '15px' }}>
                <Col span={6}>
                    Tax Percent:
                </Col>
                <Col span={18}>

                  <InputNumber
                    defaultValue={0}
                    value={this.state.taxPercent}
                    onChange={this.onTaxPercentChange.bind(this)}
                  />
                </Col>
              </Row>

              <Row style={{ 'marginTop': '15px' }}>
                <Col span={6}>
                    Max Lock Duration:
                </Col>
                <Col span={18}>

                  <InputNumber
                    defaultValue={0}
                    value={this.state.maxLock}
                    onChange={this.onMaxLockChange.bind(this)}
                  />
                </Col>
              </Row>

              <Row style={{ 'marginTop': '15px' }}>
                <Col span={6}>
                    Owner's actions delay:
                </Col>
                <Col span={18}>

                  <InputNumber
                    defaultValue={0}
                    value={this.state.delay}
                    onChange={this.onDelayChange.bind(this)}
                  />
                </Col>
              </Row>

              <Row style={{ 'marginTop': '15px' }}>
                <Col span={24}>
                  <Button style={{ 'width': '100%' }} onClick={this.createPool.bind(this)} type="primary" className="btn-margin-top submit-button">createPool</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }

  ord_renderBreadcrumb () { // eslint-disable-line
    return (
      <Breadcrumb style={{ 'marginLeft': '16px', 'marginTop': '16px', float: 'right' }}>
        <Breadcrumb.Item><Link to="/userdata"><Icon type="home" /> Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Pool's Control</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  createPool () {
    this.props.createPool(
      this.state.owner,
      this.state.taxPercent,
      this.state.maxLock,
      this.state.delay
    )
  }

  onOwnerChange (e) {
    this.setState({
      owner: e.target.value
    })
  }

  onTaxPercentChange (value) {
    this.setState({
      taxPercent: value
    })
  }

  onMaxLockChange (value) {
    this.setState({
      maxLock: value
    })
  }

  onDelayChange (value) {
    this.setState({
      delay: value
    })
  }

}
