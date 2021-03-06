import { PromiEvent } from 'web3-core-promievent';
import { ProvidersModuleFactory } from 'web3-providers';
import * as Utils from 'web3-utils';
import { formatters } from 'web3-core-helpers';
import { MethodModuleFactory } from 'web3-core-method';
import { AbiCoder } from 'web3-eth-abi';
import { Network } from 'web3-net';
import { AbstractWeb3Module } from 'web3-core';
import isFunction from 'lodash/isFunction';
import namehash from 'eth-ens-namehash';
import { AbstractContract, ContractModuleFactory } from 'web3-eth-contract';

class Ens extends AbstractWeb3Module {
  constructor(provider, providersModuleFactory, methodModuleFactory, options, ensModuleFactory, promiEvent, abiCoder, utils, formatters$$1, registryOptions, net) {
    super(provider, providersModuleFactory, methodModuleFactory, null, options);
    this.ensModuleFactory = ensModuleFactory;
    this.promiEvent = promiEvent;
    this.abiCoder = abiCoder;
    this.utils = utils;
    this.formatters = formatters$$1;
    this.registryOptions = registryOptions;
    this.net = net;
    this._registry = false;
  }
  get registry() {
    if (!this._registry) {
      this._registry = this.ensModuleFactory.createRegistry(this.currentProvider, this.providersModuleFactory, this.methodModuleFactory, this.contractModuleFactory, this.promiEvent, this.abiCoder, this.utils, this.formatters, this.registryOptions, this.net);
    }
    return this._registry;
  }
  setProvider(provider, net) {
    return !!(super.setProvider(provider, net) && this.registry.setProvider(provider, net));
  }
  resolver(name) {
    return this.registry.resolver(name);
  }
  async supportsInterface(name, interfaceId, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.supportsInterface(interfaceId).call(callback);
  }
  async getAddress(name, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.addr(namehash.hash(name)).call(callback);
  }
  setAddress(name, address, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setAddr(namehash.hash(name), address).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
  async getPubkey(name, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.pubkey(namehash.hash(name)).call(callback);
  }
  setPubkey(name, x, y, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setPubkey(namehash.hash(name), x, y).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
  async getText(name, key, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.text(namehash.hash(name), key).call(callback);
  }
  setText(name, key, value, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setText(namehash.hash(name), key, value).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
  async getContent(name, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.content(namehash.hash(name)).call(callback);
  }
  setContent(name, hash, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setContent(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
  async getMultihash(name, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.multihash(namehash.hash(name)).call(callback);
  }
  setMultihash(name, hash, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setMultihash(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
  async getContenthash(name, callback = null) {
    const resolver = await this.registry.resolver(name);
    return resolver.methods.contenthash(namehash.hash(name)).call(callback);
  }
  setContenthash(name, hash, sendOptions, callback = null) {
    const promiEvent = new this.registry.PromiEvent();
    this.registry.resolver(name).then(resolver => {
      resolver.methods.setContenthash(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', transactionHash => {
        promiEvent.emit('transactionHash', transactionHash);
      }).on('confirmation', (confirmationNumber, receipt) => {
        promiEvent.emit('confirmation', confirmationNumber, receipt);
      }).on('receipt', receipt => {
        if (isFunction(callback)) {
          callback(receipt);
        }
        promiEvent.emit('receipt', receipt);
        promiEvent.resolve(receipt);
      }).on('error', error => {
        if (isFunction(callback)) {
          callback(error);
        }
        promiEvent.emit('error', error);
        promiEvent.reject(error);
      });
    });
    return promiEvent;
  }
}

const REGISTRY_ABI = [{
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'resolver',
  outputs: [{
    name: '',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'owner',
  outputs: [{
    name: '',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'label',
    type: 'bytes32'
  }, {
    name: 'owner',
    type: 'address'
  }],
  name: 'setSubnodeOwner',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'ttl',
    type: 'uint64'
  }],
  name: 'setTTL',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'ttl',
  outputs: [{
    name: '',
    type: 'uint64'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'resolver',
    type: 'address'
  }],
  name: 'setResolver',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'owner',
    type: 'address'
  }],
  name: 'setOwner',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'owner',
    type: 'address'
  }],
  name: 'Transfer',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: true,
    name: 'label',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'owner',
    type: 'address'
  }],
  name: 'NewOwner',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'resolver',
    type: 'address'
  }],
  name: 'NewResolver',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'ttl',
    type: 'uint64'
  }],
  name: 'NewTTL',
  type: 'event'
}];

const RESOLVER_ABI = [{
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'key',
    type: 'string'
  }],
  name: 'text',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'key',
    type: 'string'
  }, {
    name: 'value',
    type: 'string'
  }],
  name: 'setText',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'interfaceID',
    type: 'bytes4'
  }],
  name: 'supportsInterface',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'pure',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'contentTypes',
    type: 'uint256'
  }],
  name: 'ABI',
  outputs: [{
    name: 'contentType',
    type: 'uint256'
  }, {
    name: 'data',
    type: 'bytes'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes'
  }],
  name: 'setMultihash',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'multihash',
  outputs: [{
    name: '',
    type: 'bytes'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes'
  }],
  name: 'setContenthash',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'contenthash',
  outputs: [{
    name: '',
    type: 'bytes'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'x',
    type: 'bytes32'
  }, {
    name: 'y',
    type: 'bytes32'
  }],
  name: 'setPubkey',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'content',
  outputs: [{
    name: 'ret',
    type: 'bytes32'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'addr',
  outputs: [{
    name: 'ret',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'contentType',
    type: 'uint256'
  }, {
    name: 'data',
    type: 'bytes'
  }],
  name: 'setABI',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'name',
  outputs: [{
    name: 'ret',
    type: 'string'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'name',
    type: 'string'
  }],
  name: 'setName',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes32'
  }],
  name: 'setContent',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'pubkey',
  outputs: [{
    name: 'x',
    type: 'bytes32'
  }, {
    name: 'y',
    type: 'bytes32'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'addr',
    type: 'address'
  }],
  name: 'setAddr',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  inputs: [{
    name: 'ensAddr',
    type: 'address'
  }],
  payable: false,
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'a',
    type: 'address'
  }],
  name: 'AddrChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'hash',
    type: 'bytes32'
  }],
  name: 'ContentChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'indexedKey',
    type: 'string'
  }, {
    indexed: false,
    name: 'key',
    type: 'string'
  }],
  name: 'TextChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'hash',
    type: 'bytes'
  }],
  name: 'ContenthashChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'name',
    type: 'string'
  }],
  name: 'NameChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: true,
    name: 'contentType',
    type: 'uint256'
  }],
  name: 'ABIChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'x',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'y',
    type: 'bytes32'
  }],
  name: 'PubkeyChanged',
  type: 'event'
}];

class Registry extends AbstractContract {
  constructor(provider, providersModuleFactory, methodModuleFactory, contractModuleFactory, promiEvent, abiCoder, utils, formatters$$1, options, net) {
    super(provider, providersModuleFactory, methodModuleFactory, contractModuleFactory, promiEvent, abiCoder, utils, formatters$$1, REGISTRY_ABI, '', options);
    this.net = net;
    this.resolverContract = null;
    this.resolverName = null;
    this.checkNetwork().then(address => {
      this.address = address;
    });
  }
  owner(name, callback = null) {
    return new Promise((resolve, reject) => {
      this.methods.owner(namehash.hash(name)).call().then(receipt => {
        resolve(receipt);
        if (isFunction(callback)) {
          callback(false, receipt);
        }
      }).catch(error => {
        reject(error);
        if (isFunction(callback)) {
          callback(error, null);
        }
      });
    });
  }
  setProvider(provider, net) {
    if (this.resolverContract) {
      return !!(super.setProvider(provider, net) && this.resolverContract.setProvider(provider, net));
    }
    return super.setProvider(provider, net);
  }
  async resolver(name) {
    if (this.resolverName === name && this.resolverContract) {
      return this.resolverContract;
    }
    const address = await this.methods.resolver(namehash.hash(name)).call();
    const clone = this.clone();
    clone.jsonInterface = RESOLVER_ABI;
    clone.address = address;
    this.resolverName = name;
    this.resolverContract = clone;
    return clone;
  }
  async checkNetwork() {
    const ensAddresses = {
      main: '0x314159265dD8dbb310642f98f50C066173C1259b',
      ropsten: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
      rinkeby: '0xe7410170f87102df0055eb195163a03b7f2bff4a'
    };
    const block = await this.net.getBlock('latest', false);
    const headAge = new Date() / 1000 - block.timestamp;
    if (headAge > 3600) {
      throw new Error(`Network not synced; last block was ${headAge} seconds ago`);
    }
    const networkType = await this.net.getNetworkType();
    const address = ensAddresses[networkType];
    if (typeof address === 'undefined') {
      throw new TypeError(`ENS is not supported on network: "${networkType}"`);
    }
    return address;
  }
}

class EnsModuleFactory {
  createENS(provider, providersModuleFactory, methodModuleFactory, contractModuleFactory, promiEvent, abiCoder, utils, formatters$$1, net, registryOptions, ensModuleOptions) {
    return new Ens(provider, providersModuleFactory, methodModuleFactory, ensModuleOptions, this, promiEvent, abiCoder, utils, formatters$$1, registryOptions, net);
  }
  createRegistry(provider, providersModuleFactory, methodModuleFactory, contractModuleFactory, promiEvent, abiCoder, utils, formatters$$1, options, net) {
    return new Registry(provider, providersModuleFactory, methodModuleFactory, contractModuleFactory, promiEvent, abiCoder, utils, formatters$$1, options, net);
  }
}

const Ens$1 = (provider, accounts, options) => {
  const abiCoder = new AbiCoder();
  const methodModuleFactory = new MethodModuleFactory();
  return new EnsModuleFactory().createENS(provider, new ProvidersModuleFactory(), new MethodModuleFactory(accounts), new ContractModuleFactory(Utils, formatters, abiCoder, accounts, methodModuleFactory), PromiEvent, abiCoder, Utils, formatters, new Network(provider), {}, options);
};

export { Ens$1 as Ens };
