/**
 * @file Tab機能
 */
const tabTriggers = [];
const tabContents = [];

/**
 * Tab切替
 * @param {*} event イベント
 * @param {*} group TabのGroup
 * @param {*} name 連動するTabの名称
 */
const changeTab = (event, group, name) => {
  console.log('changeTab');
  event.preventDefault();

  // タブの選択中トリガーを切り替える
  for (const trigger of tabTriggers) {
    // 同一group以外は無視する
    if (trigger.group !== group) {
      continue;
    }

    // 選択中のタブを切替
    if (trigger.name === name) {
      trigger.element.classList.add('is-current');
    } else {
      trigger.element.classList.remove('is-current');
    }
  }

  // タブの選択中コンテンツを切り替える
  for (const content of tabContents) {
    // 同一group以外は無視する
    if (content.group !== group) {
      continue;
    }

    // 選択中のタブを切替
    if (content.name === name) {
      // 表示
      content.element.style.display = '';
      content.element.classList.add('is-current');
    } else {
      // 非表示
      content.element.style.display = 'none';
      content.element.classList.remove('is-current');
    }
  }
};

export const generateTab = (wrapper) => {
  const triggers = [...wrapper.getElementsByClassName('js-tab-trigger')];
  const contents = [...wrapper.getElementsByClassName('js-tab-content')];

  // Tabトリガー設定
  for (const trigger of triggers) {
    // data属性のlistとinfoを取得する
    const triggerGroup= trigger.getAttribute('data-tab-group');
    const triggerName = trigger.getAttribute('data-tab-name');

    // data属性のlistとinfoは設定必須なのでチェック
    if (!triggerGroup || !triggerName) {
      continue;
    }

    // Tabのトリガーを設定
    tabTriggers.push({
      element: trigger,
      group: triggerGroup,
      name: triggerName,
    });

    // トリガーのクリックイベントを設定
    trigger.addEventListener('click', () => changeTab(event, triggerGroup, triggerName));
  }

  // Tabコンテンツ設定
  for (const content of contents) {
    // data属性のlistとinfoを取得する
    const contentGroup = content.getAttribute('data-tab-group');
    const contentName = content.getAttribute('data-tab-name');

    // data属性のlistとinfoは設定必須なのでチェック
    if (!contentGroup || !contentName) {
      continue;
    }

    // Tabのコンテンツを設定
    tabContents.push({
      element: content,
      group: contentGroup,
      name: contentName,
    });
  }
}