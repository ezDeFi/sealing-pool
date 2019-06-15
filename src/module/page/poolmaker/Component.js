import React from 'react' // eslint-disable-line
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container' // eslint-disable-line
import Tx from 'ethereumjs-tx' // eslint-disable-line
import { Link } from 'react-router-dom' // eslint-disable-line
import web3 from 'web3'

import './style.scss'

import { Col, Row, Icon, Button, Breadcrumb, Input, InputNumber } from 'antd' // eslint-disable-line

const weiToEther = (wei) => {
  return Number(web3.utils.fromWei(wei.toString())).toFixed(4)
}

export default class extends StandardPage {
  componentDidMount () {
    this.setState({
      owner: this.props.wallet,
      name: '',
      website: '',
      location: '',
      logo: '',
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

  renderRowText(title, content) {
    return (
      <Row>
        <Col md={8} xs={8}>
          <span className="text-left">{title}</span>
        </Col>
        <Col md={16} xs={16}>
          <div className="text-right">
            {content}
          </div>
        </Col>
      </Row>
    )
  }

  renderRowInput(title, content) {
    return (
      <Row>
        <Col md={8} xs={8}>
          <span className="text-left">{title}</span>
        </Col>
        <Col md={16} xs={16}>
          <div className="">
            {content}
          </div>
        </Col>
      </Row>
    )
  }

  poolCreateRender () {
    return (
      <div>
        {this.renderRowInput(`Owner`, <span>
          <Input
            value={this.state.owner}
            onChange={this.onOwnerChange.bind(this)}
          />
        </span>)}

        {this.renderRowInput(`Pool's Name`, <span>
          <Input
            placeholder="Your pool name"
            onChange={this.onNameChange.bind(this)}
          />
        </span>)}

        {this.renderRowInput(`Pool's Website`, <span>
          <Input
            placeholder="Your website url"
            value={this.state.website}
            onChange={this.onWebsiteChange.bind(this)}
          />
        </span>)}

        {this.renderRowInput(`Pool's Location`, <span>
          <Input
            placeholder="Your pool location"
            value={this.state.location}
            onChange={this.onLocationChange.bind(this)}
          />
        </span>)}

        {this.renderRowInput(`Pool's logo`, <span>
          <Input
            placeholder="Your pool logo"
            value={this.state.logo}
            onChange={this.onlogoChange.bind(this)}
          />
        </span>)}

        {this.renderRowInput(`CompRate (0..100):`, <span>
          <InputNumber
              defaultValue={0}
              value={this.state.compRate}
              onChange={this.onCompRateChange.bind(this)}
            />
        </span>)}

        {this.renderRowInput(`Max Lock Duration (days):`, <span>
          <InputNumber
              defaultValue={0}
              value={this.state.maxLock}
              onChange={this.onMaxLockChange.bind(this)}
            />
        </span>)}

        {this.renderRowInput(`Owner's actions delay(hours):`, <span>
          <InputNumber
              defaultValue={0}
              value={this.state.delay}
              onChange={this.onDelayChange.bind(this)}
            />
        </span>)}

        {this.renderRowInput(`Owner's actions delay(hours):`, <span>
          <Button onClick={this.createPool.bind(this)} type="ebp">createPool</Button>
        </span>)}
      </div>
    )
  }

  ord_renderContent () { // eslint-disable-line
    return (
      <div className="">
        <div className="page-common">
          <Row>
            <h3 className="title">Pool's Maker</h3>
          </Row>
          <div>
            {!this.state.newPool && this.poolCreateRender()}
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
      this.state.logo
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

  onlogoChange (e) {
    this.setState({
      logo: e.target.value
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
