
import buildUrl from 'build-url/src/build-url.js';
import queryString from 'query-string/index.js';

export class URLManager {

   constructor(baseUrl) {
      this.baseUrl = baseUrl;
      this.currentUrl = baseUrl;
      console.log(baseUrl)
   }

   add() {
      // //?https://abc.com?q=query&p=page&f.fld1=val1,val2,val3&f.fld2=v1,v3
      let queryParams = {};

      if (this.query) {
         queryParams.q = this.query;
      }
      if (this.page) {
         queryParams.p = this.page;
      }
      if (this.sort) {
         queryParams.sort = this.sort;
      }
      if (this.skip) {
         queryParams.s = this.skip;
      }
      if (this.filters) {
         Object.keys(this.filters).forEach(f => {
            queryParams[f] = this.filters[f];
         });
      }
      if (this.ranges) {
         Object.keys(this.ranges).forEach(r => {
            queryParams[r] = this.ranges[r];
         });
      }
      //removed / before search
      let newUrl = buildUrl(`${this.baseUrl}/st-search`, {
            queryParams: queryParams
         }
      );
      this.currentUrl = newUrl.replace(/#/g, '');
   }

   getCurrentUrl() {
      return this.currentUrl.replace(/#/g, '');
   }

   withSort(sort) {
      this.sort = sort;
      this.add();
      return this;
   }

   withQuery(q) {
      this.query = q;
      this.add();
      return this;
   }

   withLoad(loadPage) {
      this.loadPage = loadPage;
      this.add();
      return this;
   }
   withPage(page) {
      this.page = page;
      this.add();
      return this;
   }

   withFilters(fld, values) {
      this.filters = this.filters || {};
      this.filters[`f.${fld}`] = values;
      this.add();
      return this;
   }

   withNumericFilters(fld, array) {
      this.filters = this.filters || {};

      let values = [];

      array.forEach(ar => {
         let ele = `${ar[0]} - ${ar[1]}`;
         values.push(ele)
      });
      this.filters[`f.${fld}`] = values;
      this.add();
      return this;
   }


   withRange(fld, range_from, range_to) {
      this.ranges = this.ranges || {};
      this.ranges[`rf.${fld}`] = range_from;
      this.ranges[`rt.${fld}`] = range_to;
      this.add();
      return this;
   }

   clear() {
      this.filters = {};
      this.add()
      // return this;
   }

   clearPage(){
      this.page = ''
   }

   clearSort() {
      this.sort = '';
      this.add()
      // return this;
   }

   parseUrl(url) {
      if (url !== null && url !== undefined) {
         let newUrl = decodeURIComponent(url).replace(/#/g, '').split('?');
         let url1 = newUrl[0];
         let url2 = newUrl[1];
         url2 = `?${url2}`;

         let str = queryString.parse(url2);
         // let key = Object.keys(str);
         let val = {};

         let data = {
            query: "",
            page: "",
            skip: "",
            sort: "",
            filters: {},
            ranges: {}
         }

         Object.keys(str).forEach(key => {
            switch (key) {
               case 'q':
                  this.q = str[key];
                  data.query = this.q;
                  break;

               case 'p':
                  this.p = str[key];
                  data.page = this.p;
                  break;

               case 's':
                  this.s = str[key];
                  data.skip = this.s;
                  break;

               case 'st_page':
                  this.st_page = str[key];
                  data.page = this.st_page;
                  break;

               case 'sort':
                  this.sort = str[key];
                  data.sort = this.sort;
                  break;
               default:
                  if (key.startsWith('f.')) {
                     let cat = key.substring(2);
                     this.cat = str[key].split(',');
                     this.cat = this.cat.map(x=> {return x.replace(/@/g,",")});
                     data.filters[cat] = this.cat;
                  }
                  if (key.startsWith('rf.')) {
                     let field = key.substring(3);
                     this[field] = {
                        from: "",
                        to: ""
                     }
                     let from = key;
                     let to = from.replace('rf.', 'rt.');
                     this[field].from = str[from];
                     this[field].to = str[to];
                     data.ranges[field] = this[field];
                  }
            }
         });
         return data;
      } else {
         let data = {
            query: "",
            page: "",
            sort: "",
            skip: "",
            filters: {},
            loadPage: "",
            ranges: {},
            load: true,
         }

         return data;

      }
   }

   onNavigate(callbackFn) {

   }
};
