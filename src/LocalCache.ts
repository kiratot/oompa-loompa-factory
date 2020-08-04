interface APIData {
  data: object[] | [];
  timeStamp: number;
  key: string;
}

export class LocalCache {
  private cacheTime: number = 24 * 60 * 60 * 1000; //1 day as a default parameter
  private storedData: APIData[] | [] = [];

  constructor(cacheTime: number) {
    this.cacheTime = cacheTime;
  }
  store(key: string, data: object[]) {
    const timeStamp: number = Date.now();
    this.storedData = this.retrieve(key);
    if (this.storedData.length > 0) {
      this.storedData = [...this.storedData, { data, timeStamp, key }];
      localStorage.setItem(key, JSON.stringify(this.storedData));
    } else {
      this.storedData = [{ data, timeStamp, key }];
      localStorage.setItem(key, JSON.stringify(this.storedData));
    }
  }
  retrieve(key: string): APIData[] | [] {
    this.shouldDelete(key);
    if (this.storedData.length > 0) {
      return this.storedData.filter((e: APIData) => e.key === key);
    } else {
      const localData: APIData[] = JSON.parse(localStorage.getItem(key)!);
      if (localData) {
        return localData.filter((e: APIData) => e.key === key);
      } else return [];
    }
  }
  private shouldDelete(key: string) {
    const localData: APIData[] = JSON.parse(localStorage.getItem(key) || "");
    if (localData) {
      this.storedData = this.storedData.filter(
        (e: APIData) => Date.now() >= e.timeStamp + this.cacheTime
      );
      localStorage.setItem(key, JSON.stringify(this.storedData));
    }
  }
}
