## Alogrand Indexer Transaction Search Module

### Setup

```html
<script src="https://cdn.jsdelivr.net/npm/algosdk@v2.1.0/dist/browser/algosdk.min.js"></script>
<script src="https://cdn.statically.io/gh/runvnc/algorandindexersearch/main/algosearch.js"></script>
```

### Info

```javascript
// types of transactions:
//   pay (payment, always in ALGOs), keyreg, 
//   acfg (asset config, create, destroy or modify an asset/ASA),
//   axfer (asset transfer, involves specific asset-id), transfer an ASA),
//   afrz (asset freeze),
//   appl (application call), 
//   stpf (state proof transactions)

// addressRoles: sender, receiver, freeze-target```

// ALGO amounts for pay transactions are in microALGOs
// 1 microALGO = 1000000 ALGOs


// key function: async searchTxns(options)
// options: address, addressRole, limit, beforeTime, afterTime, round, minRound, maxRound,
//          currencyGreaterThan, currencyLessThan, applicationID (int), assetID (int),
//          txType, notePrefix, sigType, txid (transaction ID (string))

// Note that all of parameter calls can be combined in different ways other
// than the exact examples shown here. Especially note that addressRole
// is OPTIONAL as are the other parameters.

### Examples

async function logSearch(label, options) {
  console.log(label+':')
  console.log(JSON.stringify(await searchTxns(options)))
  // searchTxns() is a promise that returns an array of objects
  // fields depend on tx-type (txType)
  // (see example results below)
}

async function examples() {
  // IMPORTANT: Note that these are just examples, nothing here is required.
  let afterTime = new Date('02-16-23').toISOString()
  let limit = 1
  let address = 'WARN666I6ITOTBIFMYOOYDAT2JA63QQO2Y6MJCNER5YAF4L6MQO7W6SCAM'
  // Note: normally use searchTxns instead of logSearch, unless you are just console.logging the results.
  await logSearch('axfer', {txType:'axfer', afterTime, limit})
  // IMPORTANT: Note the resulting properties are different for each different type of transaction.
  //[{"amount":0,"asset-id":27165954,"close-amount":0,"receiver":"P3JMWRKRMWPT4H4ITYHB2HK2STJBGFTE47SPVXPDLGUY7SVEW6MTGXHCYI","round-time":"2023-02-16T06:00:03.000Z","sender":"ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754","tx-type":"axfer"}]
  
  await logSearch('pay', {txType:'pay', afterTime, limit, address, addressRole: 'sender'})
  // [{"amount":1,"close-amount":0,"receiver":"NUDGPJCQ2GNCX2CL4EIZ6LDDILGM2XTLGIK3LKNKHRRYY4BBNXT7TGB5WA","round-time":"2023-02-16T08:58:26.000Z","sender":"WARN666I6ITOTBIFMYOOYDAT2JA63QQO2Y6MJCNER5YAF4L6MQO7W6SCAM","tx-type":"pay"}]

  await logSearch('acfg', {txType:'acfg', afterTime, limit})
  // [{"asset-id":1017123973,"params":{"clawback":"POPS6362FMTDAKJTRWVTV3DOZWN4JHLVINUHEITGQV7RA73R4XTU64DBXM","creator":"POPS6362FMTDAKJTRWVTV3DOZWN4JHLVINUHEITGQV7RA73R4XTU64DBXM","decimals":0,"default-frozen":false,"manager":"POPS6362FMTDAKJTRWVTV3DOZWN4JHLVINUHEITGQV7RA73R4XTU64DBXM","reserve":"7YQVIM4NVMMXEK2ZMFFQBAY2OZCTX23DZXSLDT7SH2QLEWT6AX7VPLHCR4","total":0},"round-time":"2023-02-16T06:00:21.000Z","sender":"POPS6362FMTDAKJTRWVTV3DOZWN4JHLVINUHEITGQV7RA73R4XTU64DBXM","tx-type":"acfg"}]

  await logSearch('appl', {txType:'appl', afterTime, limit})
  // [{"accounts":["GJMRGLK5OKPK2FKYKDORIU72LQFZGK7OLV5RWWNBGQ7DYQKCKKFQX3QRT4"],"application-args":["cmVwb3J0","QlRDVVNE","AAAABb9x6TA=","AAAAAGPtxi4="],"application-id":954653222,"foreign-apps":[954653222,954653353,954653481,954653601],"foreign-assets":[954648101],"global-state-schema":{"num-byte-slice":0,"num-uint":0},"local-state-schema":{"num-byte-slice":0,"num-uint":0},"on-completion":"noop","round-time":"2023-02-16T06:00:03.000Z","sender":"XIJKTRIGAZCHVL3UGUVJ6YPXF74WZ6LPVPG2KT66J4NFUEYN2F4EDO5RBY","tx-type":"appl"}]
}

examples().catch(console.error)

