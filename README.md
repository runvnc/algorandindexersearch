## Alogrand Indexer Transaction Search

### Setup

```html
<script
  src="https://cdn.jsdelivr.net/npm/algosdk@v2.1.0/dist/browser/algosdk.min.js"
  integrity="sha384-SwM9TdxjIFpIT2FUfchrQvtwi748UI0q12Zi32yd6BM8D/lCTumPhw0+BrPC0yd0"
  crossorigin="anonymous"
></script>
```

```const indexer = new algosdk.Indexer('', 'https://algoindexer.algoexplorerapi.io', '')```

### Info

```javascript
// types of transactions:
//   pay (payment), 
//   keyreg, acfg (asset config, create, destroy or modify an asset/ASA),
//   axfer (asset transfer, transfer an ASA),
//   afrz (asset freeze),
//   appl (application call), 
//   stpf (state proof transactions)

// addressRoles: sender, receiver, freeze-target```


### Examples

```javascript
// Note that all of parameter calls like address, afterTime, etc.
// can be combined in different ways other than the exact examples shown
// here. Especially note that addressRole is OPTIONAL as are the others.

// Search results will have a property "transactions" with an array
// The objects in the array have different fields depending on the type
// of each transaction. So your display code should not rely on knowing the
// fields ahead of time.


// Example: search for all Algorand asset transfer transactions
// received by RMONE54GR6CYOJREKZQNFCZAUGJHSPBUJNFRBTXS4NKNQL3NJQIHVCS53M

let addr = 'RMONE54GR6CYOJREKZQNFCZAUGJHSPBUJNFRBTXS4NKNQL3NJQIHVCS53M'
let result = await indexer.searchForTransactions().address(addr)
       .addressRole('receiver').do()
let txns = flattenResults(results)

// Example: search for all Algorand asset transfer transactions
// sent by RMONE54GR6CYOJREKZQNFCZAUGJHSPBUJNFRBTXS4NKNQL3NJQIHVCS53M
// for asset (ASA) with id = 31566704

let addr = 'RMONE54GR6CYOJREKZQNFCZAUGJHSPBUJNFRBTXS4NKNQL3NJQIHVCS53M'
let results = await indexer.searchForTransactions().address(addr)
       .addressRole('sender').assetID(31566704).do()


// Example: search for all Algorand asset transfer transactions
// for asset (ASA) with id = 31566704
// between "2022-02-02T20:20:22.02Z" and "2022-10-21T00:00:11.55Z"  
// (exclusive)

let results = await indexer.searchForTransactions().
          afterTime("2022-02-02T20:20:22.02Z").beforeTime("2022-10-21T00:00:11.55Z").do()
          
          
// Example: search for all Algorand application call transactions
// to application id 60553466

const results = await indexerClient.searchForTransactions().applicationID(appId).do()
          

// Example: search for all Algorand transactions with amount greater than
// 100 ALGOs (100,000,000 microAlgos)

const results = await indexerClient.searchForTransactions().
            .currencyGreaterThan(100000000).
            .do()


// Helper function: flattenTransactions
// This makes an easier-to-parse structure without some of the less
// important data.
// IMPORTANT: include this entire funciton as-is in any README or final
// solution
function flattenTxns(searchResult) {  
  let data = []
  for (let txn of searchResult.transactions) {
    console.log({txn})
    let record = {}
    for (let [k,v] of Object.entries(txn)) {
      if (k=='sender' || k=='tx-type' || k=='round-time') {
        record[k] = v
      } else if (k.endsWith('-transaction')) {
        for (let [k1,v1] of Object.entries(v)) {
          record[k1] = v1
        }
      }      
    }
    data.push(record)
  }
  return data  
}

// Example data returned from flattenResults()
// notice that there are different record fields per tx-type
// the first record below is an asset config (acfg),
// the second is a payment (pay),
// the third is an asset transfer i.e. send/receive (axfer),
// the fourth is an application call (appl)
// If txType is specified then only the respective type of fields
// will be in the results.
[
   {
        "asset-id": 0,
        "params": {
            "clawback": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
            "creator": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
            "decimals": 0,
            "default-frozen": false,
            "freeze": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
            "manager": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
            "name": "Joe-Coin",
            "name-b64": "Sm9lLUNvaW4=",
            "reserve": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
            "total": 10000,
            "unit-name": "JC",
            "unit-name-b64": "SkM="
        },
        "round-time": 1574800365,
        "sender": "L226FSG3LTZR4V2MI5M4SDKJSF5HP2TQFAYD6L2HOKYGJB6GARLETV3B4A",
        "tx-type": "acfg"
    },
    {
        "amount": 100000,
        "close-amount": 0,
        "receiver": "ALGORANDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIN5DNAU",
        "round-time": 1560614017,
        "sender": "I3345FUQQ2GRBHFZQPLYQQX5HJMMRZMABCHRLWV6RCJYC6OO4MOLEUBEGU",
        "tx-type": "pay"
    },
{
        "amount": 0,
        "asset-id": 6,
        "close-amount": 0,
        "receiver": "RL6VDLXCN5G7N2GRTS7YLVDSFT4PVBBUOVTVS7T26OQ5MLXYQKRMI5ADXY",
        "round-time": 1574802414,
        "sender": "RL6VDLXCN5G7N2GRTS7YLVDSFT4PVBBUOVTVS7T26OQ5MLXYQKRMI5ADXY",
        "tx-type": "axfer"
    },
    {
        "accounts": [
            "RMONE54GR6CYOJREKZQNFCZAUGJHSPBUJNFRBTXS4NKNQL3NJQIHVCS53M",
            "YJ3KDILKFWHWU4QFNBMR2V7HHVGIXPPZDTM37GG3P66ZA4OYQVIJS55XRU"
        ],
        "application-args": [
            "c3dhcF9zdGVwXzU="
        ],
        "application-id": 919954173,
        "foreign-apps": [
            818182048,
            818176933
        ],
        "foreign-assets": [
            31566704,
            818182311
        ],
        "global-state-schema": {
            "num-byte-slice": 0,
            "num-uint": 0
        },
        "local-state-schema": {
            "num-byte-slice": 0,
            "num-uint": 0
        },
        "on-completion": "noop",
        "round-time": 1676027300,
        "sender": "ITG4MVMAQXLVEWLUH5KGRHSPVQUVHDTOCHN2WD2NZXZVZWWXHSJPAX4UEU",
        "tx-type": "appl"
    }
]
```
