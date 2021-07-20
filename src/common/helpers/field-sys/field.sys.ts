const fieldsSys: string[] = ['page', 'limit', 'rowid', 'rowversion', 'createdat', 'updatedat', 'deletedat'];
const fieldsPagination: string[] = ['page', 'limit'];

export async function RemoveField(data: any, fields: string[]) {
  try {
    if (data instanceof Array) {
      await data.forEach((d: any) => {
        OnDeleteFields(d, fields);
      });
    } else {
      for (const key of Object.keys(data)) {
        if (data[key] instanceof Array)
          await data[key].forEach((d: any) => {
            RemoveField(d, fields);
          });
      }
      await OnDeleteFields(data, fields);
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function OnDeleteFields(data: any, fields: string[]) {
  fields.forEach((field: any) => {
    delete data[field];
  });
}


export async function RemoveFieldSys(data: any) {
  await RemoveFielPagination(data);
  await RemoveField(data, fieldsSys);
}

export async function RemoveFielPagination(data: any) {
  await RemoveField(data, fieldsPagination);
}
