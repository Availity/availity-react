import * as Reactstrap from 'reactstrap';
import AvApi from '@availity/api-axios';
import loadable from '@loadable/component';
import AppIcon from '@availity/app-icon';
import Authorize from '@availity/authorize';
import Breadcrumbs from '@availity/breadcrumbs';
import Date, { DateField, DateRange, DateRangeField } from '@availity/date';
import {
  Form,
  FormGroup,
  Input,
  Field,
  Feedback as FormFeedback,
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
} from '@availity/form';
import Select, { SelectField, ResourceSelect } from '@availity/select';
<<<<<<< HEAD
=======
import {
  AvOrganizationSelect,
  AvRegionSelect,
} from '@availity/select/resources';
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
import Feedback, { FeedbackForm } from '@availity/feedback';
import Icon from '@availity/icon';
import AvLink from '@availity/link';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
import Progress from '@availity/progress';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';
import TrainingLink from '@availity/training-link';
import { Disclaimer, Agreement } from '@availity/typography';
import * as yup from 'yup';
import moment from 'moment';
import '@availity/favorites/style.scss';
<<<<<<< HEAD
import '@availity/yup';
=======
import { avDate, dateRange } from '@availity/yup';
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
import { Phone, validatePhone } from '@availity/phone';

const scopes = {
  ...Reactstrap,
  AppIcon,
  Authorize,
  Avatar: loadable(() => import('@availity/avatar')),
  Breadcrumbs,
  Date,
  DateField,
  DateRange,
  DateRangeField,
  Favorites: loadable.lib(() => import('@availity/favorites')),
  FormFeedback,
  Select,
  SelectField,
  ResourceSelect,
<<<<<<< HEAD
=======
  AvOrganizationSelect,
  AvRegionSelect,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  PageHeader: loadable(() => import('@availity/page-header')),
  Feedback,
  FeedbackForm,
  Radio,
  RadioGroup,
  avCustomResource: new AvApi({ name: 'my-custom-resource' }),
  Checkbox,
  CheckboxGroup,
  Icon,
  AvLink,
  ListGroup,
  ListGroupItem,
  ListGroupItemStatus,
  Progress,
  Wizard,
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
  TrainingLink,
  Disclaimer,
  Agreement,
  Form,
  FormGroup,
  Input,
  Field,
  yup,
<<<<<<< HEAD
=======
  avDate,
  dateRange,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  moment,
  Phone,
  validatePhone,
};

export default scopes;
