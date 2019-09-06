import React from 'react' // eslint-disable-line
import BaseComponent from '@/model/BaseComponent'
import { Layout, Menu, Icon, Modal, Button } from 'antd' // eslint-disable-line
import _ from 'lodash' // eslint-disable-line
import I18N from '@/I18N'
import './style.scss'

import { USER_ROLE } from '@/constant'

const { Header } = Layout // eslint-disable-line

export default class extends BaseComponent {
    constructor() {
        super()

        this.state = {

        }
    }
  componentDidMount () {
    document.title = 'Nexty Governance'
  }

  buildAcctDropdown () {
    const isLogin = this.props.isLogin
    const hasAdminAccess = [USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(this.props.role)

    return (
      <Menu onClick={this.clickItem.bind(this)}>
        {isLogin
          ? <Menu.Item key="profile">
            {I18N.get('0200')}
          </Menu.Item>
          : <Menu.Item key="login">
            {I18N.get('0201')}
          </Menu.Item>
        }
        {isLogin && hasAdminAccess &&
                    <Menu.Item key="admin/tasks">
                      {I18N.get('0203')}
                    </Menu.Item>
        }
        {isLogin &&
                    <Menu.Item key="logout">
                      {I18N.get('0204')}
                    </Menu.Item>
        }
      </Menu>
    )
  }

  getSelectedKeys() {
      let keys = _.map(['usercontrol', 'poolcontrol', 'poolmaker'], (key) => {
          return ((this.props.pathname || '').indexOf(`/${key}`) === 0) ? key : ''
      })
      console.log('keys', keys)
      return keys
  }

  gotoHomePage() {
    this.props.history.push('/usercontrol')
  }

  toggleMobileMenu() {
    this.props.toggleMobileMenu()
  }

  renderHeader () {
    const isLogin = this.props.isLogin

    return (
      <div className="xlogo">
        <span className="logo-icon" onClick={this.gotoHomePage.bind(this)}><img src='/assets/images/logo.png' /></span>
        <div className="header-menu menu-desktop">
          {this.props.isLogin && <Menu onClick={this.clickItem.bind(this)} mode="horizontal" selectedKeys={this.getSelectedKeys()}>
            {/* <Menu.Item key="usercontrol">
              <Icon type="user" /> {I18N.get('0002')}
            </Menu.Item> */}
            <Menu.Item key="poolcontrol">
              <Icon type="database" /> {I18N.get('0004')}
            </Menu.Item>
            <Menu.Item key="poolmaker">
              <Icon type="file-add" /> {I18N.get('0017')}
            </Menu.Item>
            {isLogin &&  <Menu.Item key="logout">
              <Icon type="logout" style={{color: "#1C7BFF"}} /> {I18N.get('0204')}
            </Menu.Item>}
          </Menu>}
        </div>
        {this.props.isLogin && <div className="show-icon-toggle">
          <span className="c_MenuItem mobile" key="mobileMenu" onClick={this.toggleMobileMenu.bind(this)}>
              <Icon style={{color: "#47aaa7", fontSize: '22px'}} type="menu-fold"/>
          </span>
        </div>}
        {/*{isLogin && <span onClick={this.logout.bind(this)} className="right-action"><a className="logout">{I18N.get('0204')}</a> <Icon type="logout" style={{color: "#1C7BFF"}} /></span>}*/}
      </div>
    )
  }

  ord_render () { // eslint-disable-line

    return (
        <Header>
          <div className="Header">
            {this.renderHeader()}
          </div>
        </Header>
    )
  }

  clickItem(e) {
        const key = e.key
        const { isLogin } = this.props

        if (_.includes([
            'home',
            'dashboard',
            'deposit',
            'userdata',
            'pooldata',
            'poolmaker',
            'poolcontrol'
        ], key)) {

            if (key === 'landing') {
                this.props.history.push('/')
            } else {
                this.props.history.push('/' + e.key)
            }
        } else if (key === 'logout') {
            this.logout()
        }
    }

  logout (e) {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.logout()
      },
      onCancel () {
      }
    })
  }
}
