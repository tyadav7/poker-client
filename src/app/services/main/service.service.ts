import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfiguration } from 'src/app/config/iconfig';
import { GetRemoteClass, RemoteClassFactory } from 'src/app/config/remote-class';


export class Service {
  private _url: string = '';

  protected get url() {
    return this._url;
  }

  configuration: IConfiguration = {
    appConfigURL: '/assets/json/app.json',
  };

  constructor(protected http: HttpClient) {}

  loadAppSettings(): Observable<string> {
    return this.http.get(this.configuration.appConfigURL).pipe(
      map((config: any) => {
        this._url = config.serviceURL + '';
        return this._url;
      })
    );
  }

  public makeGetRequest(path: string, params?: HttpParams): Observable<any> {
    return this.http.get(this.url+path, {params});
  }

  public getMappedObservableForGetRequest(
    path: string,
    params?: HttpParams,
    remoteClassName?: string
  ) {
    let observable: Observable<any> = this.makeGetRequest(path,params);

    let clazz: any =
      remoteClassName != null ? GetRemoteClass(remoteClassName) : null;

    if (!clazz) return observable;

    return observable.pipe(
      map((result) => {
        if (result instanceof Array) {
          let unpacked: any[] = [];
          for (let item of result) {
            unpacked.push(this.unpackRow(item, clazz));
          }
          return unpacked;
        } else return this.unpackRow(result, clazz);
      })
    );
  }

  protected unpackRow(raw: any, clazz: any): any {
    let cls: any;

    if (clazz instanceof RemoteClassFactory) {
      cls = clazz.create(raw);
    } else {
      cls = new clazz();

      // we can copy simple objects, anything more complicated
      // should be deserialized
      if (cls.deserialize) {
        cls.deserialize(raw);
      } else {
        try {
          this.copy(raw, cls);
        } catch (e) {
          // if we can't unpack into the clazz, return the raw value
          cls = raw;
        }
      }
    }
    return cls;
  }

  protected copy(raw: any, obj: any): any {
    // we're **assuming** that the raw value & the class members
    // have a 1-to-1 mapping

    for (let key in raw) {
      if (!key.startsWith('_')) {
        obj[key] = raw[key];
      }
    }
  }
}
