import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class CustomStorageProvider {

  public events: BehaviorSubject<object> = new BehaviorSubject<object>(null)

  constructor(public http: HttpClient) {
		console.log('Hello CustomStorageProvider Provider');
	}

	get(key) {
		return new Promise((resolve, reject) => {
			//   console.log("GET CSTORAGE in", key)
			let item = localStorage.getItem(key);
			//   console.log("GET CSTORAGE", item)
			if (item) {
        console.log('GET METHOD', item);

				return resolve(JSON.parse(item));
			}
			return resolve(null);
		});
	}
	set(key, val) {
		return new Promise((resolve, reject) => {
			//   console.log("set CSTORAGE-in", key, val)

      let notification = [];
      let notificationCurrent = val;
      let myArray:any;

      this.get('campanas').then(res => {
        if(res) {
          console.log('RES GET LS', res);

          notification.push(res);

          myArray = res;


          myArray.push(notificationCurrent);

          console.log('my array 2', myArray);

          // notification.push(notificationCurrent);

          // console.log('ARRAY GET LS', notification);
            localStorage.setItem(key, JSON.stringify(myArray));
          // .set('campanas', notification);
        } else {

          console.log('RES SET LS', res);
          notification.push(notificationCurrent);
          localStorage.setItem(key, JSON.stringify(notification));
          //this.customStorage.set('campanas', notification);
        }
    });

		//	localStorage.setItem(key, JSON.stringify(val));

      this.events.next(val)

			//   console.log("set CSTORAGE", item)
			resolve(val);
			// reject( new Error());
		});
	}
	remove(key) {
		return new Promise((resolve, reject) => {
			localStorage.removeItem(key);
			resolve('');
			// reject( new Error());
		});
	}
	clear(key) {
		return new Promise((resolve, reject) => {
			localStorage.clear();
			resolve();
			// reject( new Error());
		});
	}

	patch(key, value) {
		this.get(key).then((res) => {
			console.log('RESS', res);
			if (res) {
				const newRes = Object.assign(res, value);
				return this.set(key, newRes);
			} else {
				return this.set(key, value);
			}
		});
	}
}
