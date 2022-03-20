<?php

    # 메일보내기
    $to = "goopy8080@naver.com";
    $subject = "[contact us] " . $_POST['pname'] . "님의 문의입니다.";

    $contents = "[dmko.net 문의하기 접수내용]\r\n\r\n";
    $contents .= "성함: " . $_POST['pname'] . "\r\n";
    $contents .= "연락처: " . $_POST['phone'] . "\r\n";
    $contents .= "회사명: " . $_POST['company'] . "\r\n";
    $contents .= "업종: " . $_POST['sectors'] . "\r\n";
    $contents .= "메일: " . $_POST['email'] . "\r\n";
    $contents .= "주소(지역): " . $_POST['addr'] . "\r\n";
    $contents .= "평수: " . $_POST['area'] . "\r\n";
    $contents .= "공사시기: " . $_POST['const_time'] . "\r\n";
    $contents .= "예산: " . $_POST['req_value'] . "\r\n";
    $contents .= "상담가능시간: " . $_POST['consult_time'] . "\r\n";
    $contents .= "기타문의사항: " . $_POST['other_text'] . "\r\n";

    $headers = "From: " . $_POST['email']."\r\n";

    mail($to, $subject, $contents, $headers);

    # mms 문자 보내기
    # api key, secret key 발급
    $url = "https://api-sms.cloud.toast.com/sms/v3.0/appKeys/dZDcIgRVm8ojjstu/sender/mms";
    $data = array();
    $data["title"] = "[dmko.net 문의하기 접수내용]";
    $data["body"] = $contents;
    $data["sendNo"] = "01036477511";
    $data["recipientList"][]["recipientNo"] = "01036477511";
    $data = json_encode($data);
    $header = array();
    $header[] = 'Content-Type: application/json;charset=UTF-8';
    array_push($header, 'X-Secret-Key:pGHUAMo7');

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $res = curl_exec($ch);
    curl_close($ch);

?>