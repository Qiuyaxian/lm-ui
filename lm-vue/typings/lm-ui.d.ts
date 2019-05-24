import Vue from 'vue';
/**
 * 引入组件
 */
import { LmComponent } from './component'

import { Switch } from './switch'
import { Textarea } from './textarea'
import { Popup } from './popup'
import { Picker } from './picker'
import { PopupPicker } from './popup-picker'
import { Address, AddressPlugin } from './address'
import { Datetime } from './datetime'
import { DatetimeRange } from './datetime-range'
import { Grid, GridItem } from './grid'
import { Button } from './button'
import { Cell } from './cell'
import { Group, GroupTitle } from './group'
import { Badge } from './badge'
import { Flexbox, FlexboxItem } from './flexbox'
import { Divider } from './divider'
import { Panel, PanelItem } from './panel'
import { Tab, TabItem } from './tab'
import { Tabbar, TabbarItem } from './tabbar'
import { Marquee, MarqueeItem } from './marquee'
import { CountUp, CountDown } from './count'
import { Spinner } from './spinner'
import { Clock } from './Clock'
import { Icon } from './Icon'
import { Search } from './search'
import { Alert, AlertPlugin } from './alert'
import { Toast, ToastPlugin } from './toast'
import { Dialog, DialogPlugin } from './dialog'
import { Confirm, ConfirmPlugin } from './confirm'
import { TransferDom } from './transfer-dom'
// 定义传入install参数
export interface InstallationOptions {};
/**
 * 提供安装方法
 */
function install (vue: typeof Vue, opts: InstallationOptions): void;
/**
 * 提供组件
 */
type Component = LmComponent;
class lmAlert extends Alert {};
class lmSwitch extends Switch {};
class lmTextarea extends Textarea {};
class lmPopup extends Popup {};
class lmPicker extends Picker {};
class lmPopupPicker extends PopupPicker {};
class lmAddress extends Address {};
class lmDatetime extends Datetime {};
class lmDatetimeRange extends DatetimeRange {};
class lmGrid extends Grid {};
class lmGridItem extends GridItem {};
class lmButton extends Button {};
class lmCell extends Cell {};
class lmGroup extends Group {};
class lmGroupTitle extends GroupTitle {};
class lmBadge extends Badge {};
class lmFlexbox extends Flexbox {};
class lmFlexboxItem extends FlexboxItem {};
class lmDivider extends Divider {};
class lmPanel extends Panel {};
class lmPanelItem extends PanelItem {};
class lmToast extends Toast {};
class lmDialog extends Toast {};
class lmConfirm extends Confirm {};
class lmTab extends Tab {};
class lmTabItem extends TabItem {};
class lmTabbar extends Tabbar {};
class lmTabbarItem extends TabbarItem {};
class lmMarquee extends Marquee {};
class lmMarqueeItem extends MarqueeItem {};
class lmCountUp extends CountUp {};
class lmCountDown extends CountDown {};
class lmSpinner extends Spinner {};
class lmClock extends Clock {};
class lmIcon extends Icon {};
class lmSearch extends Search {};

/**
 * 注册指令
 */
class lmTransferDom extends TransferDom {};
/**
 * 提供插件
 */
const AlertModule: AlertPlugin = AlertPlugin;
const AddressModule: AddressPlugin = AddressPlugin;
const ToastModule: ToastPlugin = ToastPlugin;
const DialogModule: DialogPlugin = DialogPlugin;
const ConfirmModule: ConfirmPlugin = ConfirmPlugin;

/**
 * 注册全局插件
 */
declare module 'vue/types/vue' {
  interface Vue {
    $lm: {
      'toast': ToastPlugin,
      'alert': AlertPlugin
    }
  }
}
/**
 * 挂载配置
 */
export {
  lmAlert,
  lmSwitch,
  lmTextarea,
  lmPopup,
  lmPicker,
  lmPopupPicker,
  lmAddress,
  lmDatetime,
  lmDatetimeRange,
  Grid,
  GridItem,
  lmGrid,
  lmGridItem,
  lmButton,
  lmCell,
  lmGroup,
  lmGroupTitle,
  lmBadge,
  lmFlexbox,
  lmFlexboxItem,
  lmDivider,
  lmPanel,
  lmPanelItem,
  lmToast,
  lmDialog,
  lmConfirm,
  lmTransferDom,
  lmTab,
  lmTabItem,
  lmTabbar,
  lmTabbarItem,
  lmMarquee,
  lmMarqueeItem,
  lmCountUp,
  lmCountDown,
  lmSpinner,
  lmClock,
  lmIcon,
  lmSearch,

  AlertModule,
  AddressModule,
  DialogModule,
  ToastModule,
  ConfirmModule
}
export default install;

