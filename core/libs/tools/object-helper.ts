

export function containsObject<IObjectShape>(array: IObjectShape[] | any[], theObject: Partial<IObjectShape> | any) {
  let iter;

  if (!array || !theObject) return false

  for (iter in array) {
    if (array.hasOwnProperty(iter))
      if (array[iter] === theObject) return true
  }

  return false
}

export function containsObjectByKey<IObjectShape>(array: IObjectShape[] | any[], theObject: Partial<IObjectShape> | any, keyName: any) {
  let iter;

  if (!array || !theObject) return false

  for (iter in array) {
    if (array.hasOwnProperty(iter))
      if (array[iter][keyName] === theObject[keyName]) {
        return true
      }
  }

  return false
}

export function isSubsetOf<MasterObj>(masterObj: MasterObj | any, slaveObj: Partial<MasterObj> | any) {
  let subKey

  if (!masterObj || !slaveObj) return false

  for (subKey in slaveObj) {
    if (masterObj[subKey] === undefined)
      return false
  }
  return true
}