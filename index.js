window.indexer = new algosdk.Indexer('', 'https://algoindexer.algoexplorerapi.io', '')

window.searchTxns = async (options) => {
  let call = indexer.searchForTransactions()
  for (let [k,v] of Object.entries(options)) {
    call = call[k](v)
  }
  let results = await call.do()
  return flattenTxns(results)
}

function flattenTxns(searchResult) {  
  let data = []
  for (let txn of searchResult.transactions) {
    let record = {}
    for (let [k,v] of Object.entries(txn)) {
      if (k=='sender' || k=='tx-type' || k=='round-time') {
        if (k=='round-time') record[k] = new Date(v*1000)
        else record[k] = v
      } else if (k.endsWith('-transaction') ||
                 k == 'params' ) {
        for (let [k1,v1] of Object.entries(v)) {
          if (!k1.includes('b64')) record[k1] = v1
        }
      }      
    }
    data.push(record)
  }
  return data  
}

