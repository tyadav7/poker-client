var remoteClasses:any = {};

export function AddRemoteClass(clazz:any, alias:string)
{
	remoteClasses[alias] = clazz;
}

export function RemoveRemoteClass(alias:string)
{
	delete remoteClasses[alias];
}

export function GetRemoteClass(alias:string):any
{
	return remoteClasses[alias];
}

export abstract class RemoteClassFactory<T>
{
	abstract create(raw:any):T;
}