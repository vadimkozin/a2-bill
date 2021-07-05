// tariffs:
// small: SELECT t.nid, c.name, t.tar custTar, c.tar operTar, round(t.tar/c.tar,2) kf FROM mtsTar t JOIN komstarCode c ON t.nid=c.nid WHERE t.tid=1 ORDER BY c.name; 
// full:  SELECT t.nid, c.name, t.tar custTar, c.tar operTar, round(t.tar/c.tar,2) kf, c.code1, c.code2 FROM mtsTar t JOIN komstarCode c ON t.nid=c.nid WHERE t.tid=1 ORDER BY c.name;

// customers:
// SELECT CustID, CustAlias, CustName, CustType, AddressU, AddressP, Tel, Email, a2, fCalcTel, fCalcInt,
// fA, tid_t, tid_i, tid_l, 
// BankName, Account, KAccount, BIK, INN, KPP, OKPO, 
// NumDTelAbonRss, DateDTelAbonRss, NumDTelRssMtc, DateDTelRssMtc, DatePrDTelRssOOO, DatePrDTelRssOOO_642, NumDInetRssOOO, DateDInetRssOOO,
// f_fio_notice, f_contract_date, f_contract_num, f_contract_document, f_birthday
// FROM customers.Cust WHERE a2='+';