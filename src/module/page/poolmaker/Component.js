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
    this.setState({
      owner: this.props.wallet,
      name: 'name',
      website: 'website',
      location: 'location',
      description: 'description',
      compRate: 50,
      maxLock: 7,
      delay: 24,
      newPool: false
    })
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

  poolCreateRender () {
    return (
      <div>
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

        <Row>
          <Col span={6}>
            Pool's Name
          </Col>
          <Col span={18}>
            <Input
              value={this.state.name}
              onChange={this.onNameChange.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            Pool's Website
          </Col>
          <Col span={18}>
            <Input
              value={this.state.website}
              onChange={this.onWebsiteChange.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            Pool's Location
          </Col>
          <Col span={18}>
            <Input
              value={this.state.location}
              onChange={this.onLocationChange.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            Pool's Description
          </Col>
          <Col span={18}>
            <Input
              value={this.state.description}
              onChange={this.onDescriptionChange.bind(this)}
            />
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            CompRate (0..100):
          </Col>
          <Col span={18}>

            <InputNumber
              defaultValue={0}
              value={this.state.compRate}
              onChange={this.onCompRateChange.bind(this)}
            />
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
              Max Lock Duration (days):
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
              Owner's actions delay(hours):
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
    )
  }

  ord_renderContent () { // eslint-disable-line
    return (
      <div className="">
        <div className="ebp-header-divider">
        </div>

        <div className="ebp-page">
          <h3 className="text-center">Pool's Maker</h3>
          <div className="ant-col-md-18 ant-col-md-offset-3 text-alert" style={{ 'textAlign': 'left' }}>  
            {!this.state.newPool && this.poolCreateRender()}
            <div className="ebp-header-divider dashboard-rate-margin">
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

  async createPool () {
    let oneHour = 60 * 60
    let oneDay = 24 * oneHour
    let newPool = await this.props.createPool(
      this.state.owner,
      this.state.compRate,
      Number(this.state.maxLock) * oneDay,
      Number(this.state.delay) * oneHour,
      this.state.name,
      this.state.website,
      this.state.location,
      this.state.description
    )
    await this.setState({
      newPool: newPool
    })
  }

  onOwnerChange (e) {
    this.setState({
      owner: e.target.value
    })
  }

  onNameChange (e) {
    this.setState({
      name: e.target.value
    })
  }

  onWebsiteChange (e) {
    this.setState({
      website: e.target.value
    })
  }

  onLocationChange (e) {
    this.setState({
      location: e.target.value
    })
  }

  onDescriptionChange (e) {
    this.setState({
      description: e.target.value
    })
  }

  onCompRateChange (value) {
    this.setState({
      compRate: value
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
