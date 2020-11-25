import React from 'react' // eslint-disable-line
import LoggedInPage from '../LoggedInPage'
import Footer from '@/module/layout/Footer/Container' // eslint-disable-line
import Tx from 'ethereumjs-tx' // eslint-disable-line
import { Link } from 'react-router-dom' // eslint-disable-line
import web3 from 'web3'
import { cutString } from '@/service/Help'
import { zdToWei } from '../../../config/utils'

import './style.scss'

import { Col, Row, Icon, Button, Breadcrumb, Input, InputNumber, Select } from 'antd' // eslint-disable-line
const Option = Select.Option;

const weiToEther = (wei) => {
  return Number(web3.utils.fromWei(wei.toString())).toFixed(4)
}

export default class extends LoggedInPage {
  componentDidMount () {
    this.setState({
      vestingAddress: this.props.wallet
    })
    // this.loadData()
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

  handleChange (value) {
    console.log(`selected ${value}`);
    this.props.selectPool(value)
  }

  selectPool () {
    const address = this.state.poolAddress
    console.log('xxx', address)
    this.props.selectPool(address)
  }

  poolsRender () {
    let source = this.props.myPools ? this.props.myPools : []
    //console.log('data', Object.keys(source).length)
    return (
      <Row style={{ 'marginTop': '15px' }}>
        {/* <Col span={6}>
          SelectedPool: <img width={24} height={24} src={this.props.logo} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={0} xl={0}/>
        <Col span={18}>
          <Select defaultValue={this.props.mySelectedPool} className='maxWidth' onChange={this.handleChange.bind(this)}>
            {Object.keys(source).length > 0 && Object.values(source).map((d, key) => (
              <Option key={key} value={d}>{this.props.getName(d)} - {cutString(d)}</Option>
            ))}
          </Select>
        </Col> */}
        <Col span={6}>
          Pool Address:
        </Col>
        <Col span={18}>
          <Input
            className = "maxWidth"
            onChange={this.onPoolAddressChange.bind(this)}
          />
        </Col>
        <Col span={24} className = "center"  style={{ 'marginTop': '15px' }}>
          <Button type = "primary" onClick={() => this.selectPool()}>
            Select
          </Button>
        </Col>
      </Row>
    )
  }

  mainContentRender () {
    return (
      <div>
        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Pool's address:
          </Col>
          <Col span={6}>
            {this.props.mySelectedPool}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Owner:
          </Col>
          <Col span={6}>
            {this.props.owner}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Pool's name:
          </Col>
          <Col span={6}>
            {this.props.name}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Owner Compensation Rate:
          </Col>
          <Col span={6}>
            {this.props.compRate}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Pool's website:
          </Col>
          <Col span={6}>
            <a href={this.props.website} target='_'>{this.props.website}</a>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Pool's location:
          </Col>
          <Col span={6}>
            {this.props.location}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Pool's logo:
          </Col>
          <Col span={6}>
            {this.props.logo}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            signer address:
          </Col>
          <Col span={6}>
            {this.props.signer}
          </Col>
        </Row>

        {/* <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
                        owner:
          </Col>
          <Col span={6}>
            {this.props.owner}
          </Col>
        </Row> */}

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            owner's balance:
          </Col>
          <Col span={6}>
            {weiToEther(this.props.ownerBalance)} ZD
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            lockDuration / MAX:
          </Col>
          <Col span={6}>
            {this.props.lockDuration} / {this.props.maxLockDuration} Day(s)
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Owner's actionDelay:
          </Col>
          <Col span={6}>
            {this.props.ownerDelay} Hour(s)
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            fund:
          </Col>
          <Col span={6}>
            {weiToEther(this.props.fund)} ZD
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            ZD Balance:
          </Col>
          <Col span={6}>
            {weiToEther(this.props.poolNtfBalance)} ZD
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Stake require:
          </Col>
          <Col span={6}>
            {this.props.stakeRequire} ZD
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Status:
          </Col>
          <Col span={6}>
            {this.getStatus(Number(this.props.poolStatus))}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Unlock / cur. Block:
          </Col>
          <Col span={6}>
            {this.props.unlockHeight} / {this.props.blockNumber}
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Amount(ZD):
          </Col>
          <Col span={18}>
            <InputNumber
              className = "maxWidth"
              defaultValue={0}
              value={this.state.depositAmount}
              onChange={this.onDepositAmountChange.bind(this)}
            />
          </Col>
          <Col span={24} style={{ 'marginTop': '15px' }}>
            <Button onClick={this.deposit.bind(this)} type="primary" className="btn-margin-top submit-button maxWidth">Deposit</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            Signer
          </Col>
          <Col span={18}>
            <Input
              value={this.state.signer}
              onChange={this.onSignerChange.bind(this)}
            />
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.joinGov.bind(this)} type="primary" className="btn-margin-top submit-button">Join Gov</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.leaveGov.bind(this)} type="primary" className="btn-margin-top submit-button">Leave Gov</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.tokenPoolWithdraw.bind(this)} type="primary" className="btn-margin-top submit-button">Pool's Token Withdraw</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.claimFund.bind(this)} type="primary" className="btn-margin-top submit-button">Claim Fund</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={6}>
            _lockDuration
          </Col>
          <Col span={18}>
            <InputNumber
              style = {{'width' : '100%'}}
              defaultValue = {0}
              value={this.state.lockDuration}
              onChange={this.onLockDurationChange.bind(this)}
            />
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.setLockDuration.bind(this)} type="primary" className="btn-margin-top submit-button">Set lockDuration</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Col span={24}>
            <Button style={{ 'width': '100%' }} onClick={this.virtuellMining.bind(this)} type="primary" className="btn-margin-top submit-button">Mining(virtuell) 3ETH</Button>
          </Col>
        </Row>

        <Row style={{ 'marginTop': '15px' }}>
          <Row style={{ 'marginTop': '15px' }}>
            <Col span={6}>
              Token vesting
            </Col>
            <Col span={6} style={{ 'textAlign': 'center' }}>
              {this.state.vestingError && <p>{this.state.vestingError}</p>}
            </Col>
          </Row>
          <Row style={{ 'marginTop': '15px' }}>
            <Col span={6}>
              Vesting address:
            </Col>
            <Col span={18}>
              <Input
                className = "maxWidth"
                value={this.state.vestingAddress}
                onChange={this.onVestingAddressChange.bind(this)}
              />
            </Col>
          </Row>
          <Row style={{ 'marginTop': '15px' }}>
            <Col span={6}>
              Vesting amount:
            </Col>
            <Col span={18}>
              <InputNumber
                className = "maxWidth"
                defaultValue={0}
                value={this.state.vestingAmount}
                onChange={this.onVestingAmountChange.bind(this)}
              />
            </Col>
          </Row>
          <Row style={{ 'marginTop': '15px' }}>
            <Col span={6}>
              Vesting time:
            </Col>
            <Col span={18}>
              <InputNumber
                className = "maxWidth"
                defaultValue={0}
                value={this.state.vestingTime}
                onChange={this.onVestingTimeChange.bind(this)}
              />
            </Col>
            </Row>
          <Col span={24} style={{ 'marginTop': '15px' }}>
            <Button onClick={this.vesting.bind(this)} type="primary" className="btn-margin-top submit-button maxWidth">Vesting</Button>
          </Col>
        </Row>
      </div>
    )
  }

  ord_renderContent () { // eslint-disable-line
    return (
      <div className="">
        <div className="ebp-header-divider"/>
        <div className="ebp-page">
          <h3 className="text-center">Pool's Control</h3>
          <div className="ant-col-md-18 ant-col-md-offset-3 text-alert" style={{ 'textAlign': 'left' }}>
            {this.poolsRender()}
            {this.props.mySelectedPool && this.mainContentRender()}
            {/* {this.mainContentRender()} */}
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

  async deposit () {
    await this.props.approve(this.state.depositAmount * 1e18)
    await this.props.deposit(this.state.depositAmount * 1e18)
  }

  async vesting () {
    if (this.state.vestingAddress && this.state.vestingAmount && this.state.vestingTime) {
      console.log('2', this.state.vestingAddress, this.state.vestingAmount, this.state.vestingTime)
      let value = zdToWei(this.state.vestingAmount)
      await this.props.tokenVesting(this.state.vestingAddress, value, this.state.vestingTime)
    }else {
      this.setState({
        vestingError: 'fill all input!'
      })
    }
  }

  onVestingAddressChange (e) {
    console.log(e.target.value)
    this.setState({
      vestingAddress: e.target.value
    })
  }

  onVestingAmountChange (value) {
    this.setState({
      vestingAmount: value
    })
  }

  onVestingTimeChange (value) {
    this.setState({
      vestingTime: value
    })
  }

  onDepositAmountChange (value) {
    this.setState({
      depositAmount: value
    })
  }

  onSignerChange (e) {
    this.setState({
      signer: e.target.value
    })
  }

  onPoolAddressChange (e) {
    this.setState({
      poolAddress: e.target.value
    })
  }

  onLockDurationChange (value) {
    this.setState({
      lockDuration: value
    })
  }

  claimFund () {
    this.props.claimFund()
  }

  joinGov () {
    console.log('xxx signer', this.state.signer)
    this.props.joinGov(this.state.signer)
  }

  leaveGov () {
    this.props.leaveGov()
  }

  tokenPoolWithdraw () {
    this.props.tokenPoolWithdraw()
  }

  setLockDuration () {
    this.props.setLockDuration(this.state.lockDuration)
  }

  virtuellMining () {
    this.props.virtuellMining()
  }

  tokenVesting (_address, _amount, _time) {
    this.props.tokenVesting(_address, _amount, _time)
  }
}
