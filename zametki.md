Изменить порт

ng serve --port 4401

.....................................................

Смотреть задачу в разных фреймворках (мозила ошибка строка)

.....................................................


задача 10489 пустая строка select - объект

                <select class="form-control"
                        ng-model="priorityPost"
                        ng-disabled="!closeAction.visibility"
                        ng-change="selectTypePriority()"
                        ng-options="k as v for (k, v) in priorityList"
                >
                    <option ng-show="false" value=""></option>
                </select>

.....................................................

Хост лисенер

  @HostListener('window:resize') onResize(event) {
    console.log('sdads');
  }


.....................................................

когда скачет иконка

border 1px solid transparent


.....................................................

не забывай, что не только функции и onChanges, но и subscribe



----------------------------------------------------------
history.pushstate

----------------------------------------------------------

сделать спан выделяемым табом

<span tabindex="0"

.linkVisited {
  color: @color-blue-300;
  cursor: pointer;
  text-decoration: none;

  &:focus {
    background-color: red;
  }
}

----------------------------------------------------------

принимаем изменения и в случае изменений переменной вызываем функцию и работаем

  @Input('filterListTemplates')
  set filterListTemplates(value: boolean) {
    this.filtersList.list.splice(this.currentIndexForDeleteFilter, 1);
  }


---------------------------------------------------

  @HostListener('document:keyup.enter', ['$event']) onKeyUpHandler(event: KeyboardEvent) {
    if ( (document.getElementById('linked')) === document.activeElement ) {
      this.showPopup();
    }
  }


имитация клика

      let event2 = document.createEvent('MouseEvent');
      event2.initEvent('click', true, true);
      document.getElementById('linked').dispatchEvent(event2);

и document.getElementById('linked').click();


------------------------------------------------------------------

скрыть скролбар


::-webkit-scrollbar {
  display: none;
}

html, body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

--------------------------------------------------------------------

ngrok http --host-header=rewrite 4200


--------------------------------------------------------------------

text-align: justify

--------------------------------------------------------------------

display-none 
и туда код (сео)

git commit --amend -m 'Новое сообщение'


---------------------------------------------------------------------


promise.all


_-----------------------------------------------------------

массив
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes


-----------------------------------------------------------------

/** stats **/


------------------------------------------------------------------

    this.idDisable$ = this.store.pipe(select(getLoadingApp));
    // this.store.pipe(select(getLoadingApp)).subscribe((loading) => {
    //   this.idDisable = loading;
    // });
    this.httpService.getMechants.subscribe(merchants => {
      this.merchants = merchants;
    });
    
    this.merchants$ = this.httpService.getMechants;

[buiTabGroupItemDisabled]="idDisable$ | async"

--------------------------------------------------------------------
<div
    :style="{'left': item.left + 'px'}"
    v-for="item in viewItems" // index была проблема
    :key="item.id" // index была проблема
    class="image-slide"
    :class="{'anim': anim}"
>

---------------------------------------------------------------------

set и map
this.state.isToggle.has(index) ? newSetIsToggle.delete(index) : newSetIsToggle.add(index)
<div>{isToggle.has(index) ? '-' : '+'} {field.category_name}</div>

rest and spread

obj keys

---------------------------------------------------------------------

по умолчанию кнопка сабмит
пипетка в браузере + the mast с массивом масок + figma
кликаутсайд свг компоненты
v-else
вью слайде скролл и модалка
