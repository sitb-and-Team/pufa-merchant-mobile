/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/15
 */
import { lang } from '../../locale';

// 证件号类型
export const IdType = {
  idCard: 'ID_CARD',
  tmpIdCard: 'TMP_ID_CARD',
  officer: 'OFFICER',
  civil: 'CIVIL',
  policeOfficer: 'POLICE_OFFICER',
  soldiers: 'SOLDIERS',
  passport: 'PASSPORT',
  hkMacao: 'HK_MACAO'
};

// 证件号类型options
export const IdTypeOptions = {
  [IdType.idCard]: lang.idCard,
  [IdType.tmpIdCard]: lang.tmpIdCard,
  [IdType.officer]: lang.officer,
  [IdType.civil]: lang.civil,
  [IdType.policeOfficer]: lang.policeOfficer,
  [IdType.soldiers]: lang.soldiers,
  [IdType.passport]: lang.passport,
  [IdType.hkMacao]: lang.hkMacao,
};
