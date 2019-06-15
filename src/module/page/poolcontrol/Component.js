import React from 'react' // eslint-disable-line
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container' // eslint-disable-line
import Tx from 'ethereumjs-tx' // eslint-disable-line
import { Link } from 'react-router-dom' // eslint-disable-line
import web3 from 'web3'
import { cutString } from '@/service/Help'

import './style.scss'

import { Col, Row, Icon, Button, Breadcrumb, Input, InputNumber, Select } from 'antd' // eslint-disable-line
const Option = Select.Option;

const weiToEther = (wei) => {
  return Number(web3.utils.fromWei(wei.toString())).toFixed(4)
}

export default class extends StandardPage {
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

  handleChange (value) {
    console.log(`selected ${value}`);
    this.props.selectPool(value)
  }

  poolsRender () {
    let source = this.props.myPools ? this.props.myPools : []

    const title = (<Col>
        SelectedPool: <img width={24} height={24} src={this.props.logo} />
      </Col>
    )

    const content = (
      <Select defaultValue={this.props.mySelectedPool} className='maxWidth' onChange={this.handleChange.bind(this)}>
        {Object.keys(source).length > 0 && Object.values(source).map((d, key) => (
          <Option key={key} value={d}>{this.props.getName(d)} - {cutString(d)}</Option>
        ))}
      </Select>
    )

    return this.renderRowInput(title, content)
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

  mainContentRender () {
    return (
      <div>
        {this.poolsRender()}
        {this.renderRowText(`Pool's address:`, <span>{this.props.address}</span>)}

        {this.renderRowText(`Pool's name:`, <span>{this.props.name}</span>)}

        {this.renderRowText(`Pool's compRate:`, <span>{this.props.compRate}</span>)}

        {this.renderRowText(`Pool's website:`, <a href={this.props.website} target='_'>{this.props.website}</a>)}

        {this.renderRowText(`Pool's location:`, <span>{this.props.location}</span>)}

        {this.renderRowText(`Pool's logo:`, <span>{this.props.logo}</span>)}

        {this.renderRowText(`Signer address:`, <span>{this.props.signer}</span>)}

        {this.renderRowText(`Owner's balance:`, <span>{this.props.ownerBalance}</span>)}

        {this.renderRowText(`Lock duration / MAX:`, <span>{this.props.lockDuration} / {this.props.maxLockDuration} Day(s)</span>)}

        {this.renderRowText(`Owner's actionDelay:`, <span>{this.props.ownerDelay} Hour(s)</span>)}

        {this.renderRowText(`Fund:`, <span>{weiToEther(this.props.fund)} NTY</span>)}

        {this.renderRowText(`NTY Balance:`, <span>{weiToEther(this.props.poolNtyBalance)} NTY</span>)}

        {this.renderRowText(`NTF Balance:`, <span>{weiToEther(this.props.poolNtfBalance)} NTF</span>)}

        {this.renderRowText(`Stake require:`, <span>{weiToEther(this.props.stakeRequire)} NTF</span>)}

        {this.renderRowText(`Status:`, <span>{this.getStatus(Number(this.props.poolStatus))}</span>)}

        {this.renderRowText(`Unlock / cur. Block:`, <span>{this.props.unlockHeight} / {this.props.blockNumber}</span>)}
        <h3 className="title-section">In production version, only Pools: status != 0 or Holding Ntf Balance >= 3000 NTF will be showed</h3>
        <p>Current: >= 1 NTF or owner of pool</p>

        {this.renderRowInput(`Amount(NTF):`, <span>
          <InputNumber
              className = "maxWidth"
              defaultValue={0}
              value={this.state.depositAmount}
              onChange={this.onDepositAmountChange.bind(this)}
            /></span>)}

        {this.renderRowInput(``, <span><Button onClick={this.deposit.bind(this)} type="ebp">Deposit</Button></span>)}

        {this.renderRowInput(`Signer:`, <span>
          <Input
              value={this.state.signer}
              onChange={this.onSignerChange.bind(this)}
            /></span>)}

        {this.renderRowInput(``, <span>
            <Button onClick={this.joinGov.bind(this)} type="ebp">Join Gov</Button>
            <Button onClick={this.leaveGov.bind(this)} type="ebp">Leave Gov</Button>
            <Button onClick={this.tokenPoolWithdraw.bind(this)} type="ebp">Pool's Token Withdraw</Button>
            <Button onClick={this.claimFund.bind(this)} type="ebp">Claim Fund</Button>
          </span>)}

        {this.renderRowInput(`_lockDuration:`, <span>
          <InputNumber
              style = {{'width' : '100%'}}
              defaultValue = {0}
              value={this.state.lockDuration}
              onChange={this.onLockDurationChange.bind(this)}
            /></span>)}

        {this.renderRowInput(``, <span>
            <Button onClick={this.setLockDuration.bind(this)} type="ebp">Set lockDuration</Button>
            <Button onClick={this.virtuellMining.bind(this)} type="ebp" >Mining(virtuell) 3ETH</Button>
          </span>)}
      </div>
    )
  }

  ord_renderContent () { // eslint-disable-line
    return (
      <div className="">
        <div className="page-common">
          <Row>
            <h3 className="title">Pool's Control</h3>
          </Row>
          <div>
            {!this.props.mySelectedPool ? this.mainContentRender() : (
              <div>
                <p>
                  You are not owner of any pool!
                </p>
              </div>
            )}
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

  onLockDurationChange (value) {
    this.setState({
      lockDuration: value
    })
  }

  claimFund () {
    this.props.claimFund()
  }

  joinGov () {
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
}
