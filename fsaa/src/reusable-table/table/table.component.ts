import { Component, OnInit,Input, SimpleChanges, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit,OnDestroy {
  @Input() myStyle?:Object = {};
  @Input() tableStructure?: any = {};
  @Input() tableData?:Array<any> = [];
  @Input() parent?:any = undefined;
  public Object=Object;
  start = 0;
  end = 8;
  tableShowData: any = [];
  mysearch: any = {};
  ngOnInit() {
    this.setSearch();
  }
  ngOnDestroy(){

  }
  onScroll(e){
  //  // console.log(e.deltaY)
  e.preventDefault()
  e.stopPropagation()
   if(e.deltaY > 0 && this.end<this.tableShowData.length + 3){
      this.start ++;
      this.end ++;
   }
   else if(this.start>0){
    this.start --;
    this.end --;
   }
   this.scrollTo();
  }
  //function that fire on data object change(only if reference is changed as we talk about objects)
  ngOnChanges(changes: {[propKey: string]: SimpleChanges}) {  
    for (let propName in changes) {
        if(propName=='tableData'){
          // this.tableRawData = JSON.parse(JSON.stringify(this.tableData))
          if(this.tableData){
            
            this.setSearch()
          }
        }
        if(propName=='tableStructure'){
         
        }
        if(propName=='myStyle'){
         
        }
    }
  }
  setSearch(){
    this.mysearch = {};
    this.searchImplement();
  }
  searchUpdate(value,header){
    if(value == ''){
      delete(this.mysearch[header])
    }else{
      this.mysearch[header] = ""+value;
    }
    this.searchImplement();
  }
  searchImplement(){
    let tableShowData = JSON.parse(JSON.stringify(this.tableData));
    let i=0;
    let k=0;  
    try{
      let arr = Object.keys(this.mysearch);
      for(i=tableShowData.length-1;i>=0;i--){
        for(k=0;k<arr.length;k++){
          let temp = ""+tableShowData[i][arr[k]];
          if(temp.toLowerCase().indexOf(this.mysearch[arr[k]].toLowerCase()) != 0){
            tableShowData.splice(i,1);
            break;
          }
        }
      }
      this.start = 0;
      this.end = 8;
      this.tableShowData = [];
      this.tableShowData = JSON.parse(JSON.stringify(tableShowData));
      this.setScroll();
    } 
    catch(e){
      console.log(e)
      this.start = 0;
      this.end = 8;
      this.tableShowData = [];
      this.tableShowData = JSON.parse(JSON.stringify(tableShowData));
      this.setScroll();
    }
  }
  setScroll(){
    let el = document.getElementById('scrollHeight');
    el.style.height = ((this.tableShowData.length - 1) * 51) + 'px';
  }
  scrollTo(){
    let el = document.getElementById('myScrollBar');
    el.scrollTop = this.start*51;
  }
  scrollFrom(e){
    e.preventDefault();
    this.start = (e.target.scrollTop/51);
    this.end = this.start + 8;
  }
}