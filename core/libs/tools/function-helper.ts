export async function asyncForEach<T>(arr: T[], callback: (item: T, index: number, arr: T[]) => any) {
  for (let index = 0; index < arr.length; index++) {
    await callback(arr[index], index, arr);
  }
}