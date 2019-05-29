# sealing pool

This is front end which based on **webpack + react + redux**.

## how to run
```
cd front-end
npm i
npm start

# front-end will running on http://localhost:3001
```

# how to deploy
yarn deploy:pro
or
yarn deployt:dev

# Why we need sealing pool?

This is for decentralized sealing pools running on Nexty Platform, for those who has NTF (governance tokens) but cannot setup their own sealing nodes, or dont meet minimum amounts of NTF to become a sealer: [Reference](https://medium.com/nextyplatform/how-to-become-nty-miners-instruction-3ca14d8511c4)

# Steps to setup a decentralized sealer

## Setup a mining node
By following this instruction, you can [Start a miner](https://medium.com/nextyplatform/how-to-become-nty-miners-instruction-3ca14d8511c4)

Output: `Signer address`

## Build smart contract to become sealing owner

Access [Nexty Pool Master](https://poolmaster.nexty.io) using Metamask ([guide](https://medium.com/nextyplatform/how-to-become-nty-miners-instruction-3ca14d8511c4)) or using your private key (less secure method)

To create a pool, visit Pool Maker, fill the form then createPool

Compensation Rate: % Revenue pay to pool owner
Max Lock Duration (days): How long members have to wait since their request NTF withdrawal
Owner's actions delay(hours): Time to activate any change of pool from owner

After pool created, to show it on public list on the user's interface, pool has to have at least 3000 NTF

After that pool collects enough NTF (50,000 minimum), owner can start joining Goverance to be a sealer. Remember in this step, sealing node have to be online all the time.

To join Goverance, go to Pool Control, Enter the `Signer Address` that you got from previous step, then Press Join Governance

Right now, NTF holders can stake to a shared pool by access https://governance.nexty.io
