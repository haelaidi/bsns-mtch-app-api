import { In } from 'typeorm';

export async function ReduceArrayByKeys(_array: any[]): Promise<any> {
  let _object: any = {};
  _array.forEach((value: any) => {
    Object.keys(value).forEach((key: any) => {
      if (!_object[key])
        _object[key] = [];
      _object[key].push(value[key])
    })
  });
  return _object;
};

export async function ReduceArrayByKeysWith_In(_array: any[]): Promise<any> {
  let _object = await ReduceArrayByKeys(_array);
  Object.keys(_object).forEach(value => {
    _object[value] = In(_object[value]);
  });
  return _object;
}