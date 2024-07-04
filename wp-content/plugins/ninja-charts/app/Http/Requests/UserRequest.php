<?php

namespace NinjaCharts\App\Http\Requests;

use NinjaCharts\Framework\Foundation\RequestGuard;

class UserRequest extends RequestGuard
{
    /**
     * @return Array
     */
    public function rules()
    {
        return [];
    }

    /**
     * @return Array
     */
    public function messages()
    {
        return [];
    }

    /**
     * @return Array
     */
    public function sanitize()
    {
        $data = $this->all();

        $data['age'] = intval($data['age']);
        
        $data['address'] = wp_kses($data['address']);
        
        $data['name'] = sanitize_text_field($data['name']);
        
        return $data;
    }
}
